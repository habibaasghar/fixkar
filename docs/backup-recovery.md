# Backup & Recovery

## Status

No live database exists yet, so nothing below has been executed — this documents the plan against Supabase's actual documented capabilities, to be validated on first real production setup.

## Database backup

Supabase Postgres projects include automatic daily backups (retention depends on plan — 7 days on Pro, longer on Team/Enterprise) via the Supabase dashboard's Database → Backups page, plus Point-in-Time Recovery (PITR) on paid tiers for restoring to any second within the retention window. **Action item before go-live**: confirm the chosen Supabase plan's retention window meets the business's actual RPO/RTO needs — the free tier has no PITR and minimal backup retention, which is not adequate for a production marketplace handling real bookings/money.

Supplementary: `pg_dump` against `DIRECT_URL` can be scripted as an additional off-Supabase backup (e.g., nightly to S3/Supabase Storage) if independence from Supabase's own backup system is wanted. Not currently scripted anywhere in this repo.

## Storage backup

Supabase Storage buckets (`vendor-documents`, `portfolio-images`, `blog-images`, `category-icons`) are not covered by the database backup above — they're a separate system. Supabase doesn't provide automatic bucket backups; a periodic `rclone`/`aws s3 sync`-style mirror to a separate bucket/provider is the standard approach if this data must survive a Supabase project-level incident. Not implemented.

## Disaster recovery plan

1. **Application layer** (Vercel/Docker): stateless — redeploying from the last known-good commit/image restores service immediately. No data loss risk here.
2. **Database loss/corruption**: restore from the most recent Supabase backup or PITR point via the Supabase dashboard. Expect to lose any writes between the last backup/PITR point and the incident.
3. **Full Supabase project loss**: recreate the project, restore the database from an external `pg_dump` if one exists (see above — not currently automated), re-run `prisma migrate deploy` against the fresh project, recreate storage buckets and re-upload from the storage mirror if one exists.
4. **Wallet/ledger specific**: because `LedgerTransaction`/`LedgerEntry` are immutable and additive, and `Wallet` balances are reconciled against them nightly (`reconcile-wallets` job), a partial restore can be sanity-checked by re-running that job immediately after recovery — any drift between restored `Wallet.balance` fields and the restored ledger will surface as a logged mismatch rather than silently corrupting financial state further.

## Rollback procedures

- **Application code**: see `docs/deployment.md`'s Rollback section — redeploy the previous build/image.
- **Database migrations**: Prisma does not generate reversible down-migrations. Rolling back a schema change means writing a new forward migration that undoes it, after marking the bad one resolved via `prisma migrate resolve --rolled-back <name>`. Never hand-edit the `_prisma_migrations` table.
- **Before any production migration**: take a manual on-demand backup via the Supabase dashboard first, in addition to the automatic schedule — this is cheap insurance against a migration that drops/narrows a column with real data in it.
