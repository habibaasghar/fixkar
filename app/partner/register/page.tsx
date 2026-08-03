"use client";

import React, { useState } from "react";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { SuccessState } from "@/components/ui/SuccessState";
import { categories } from "@/lib/services";

export default function PartnerRegistrationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState(categories[0].slug);
  const [experienceYears, setExperienceYears] = useState("3-5 years");

  const [refCode, setRefCode] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRefCode(`REG-${Math.floor(10000 + Math.random() * 90000)}`);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Container className="py-16">
        <SuccessState
          title={`Partner Application Received!`}
          description="Thank you for applying. Our partner onboarding team will contact you within 24 hours to schedule document verification."
          referenceCode={refCode}
        />
      </Container>
    );
  }

  const categoryOptions = categories.map((c) => ({
    value: c.slug,
    label: c.name,
  }));

  const experienceOptions = [
    { value: "1-2 years", label: "1 to 2 Years" },
    { value: "3-5 years", label: "3 to 5 Years" },
    { value: "5+ years", label: "More than 5 Years" },
  ];

  return (
    <div>
      <PageHeader
        title="FixKar Partner Registration"
        subtitle="Submit your CNIC and trade skills to become a verified handyman on FixKar.pk."
      />

      <Section background="white">
        <Container>
          <Card className="max-w-xl mx-auto">
            <h2 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-4 mb-6">
              Handyman Application Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name (as on CNIC)"
                placeholder="e.g., Muhammad Tariq"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="CNIC Number (13 digits)"
                placeholder="35202-XXXXXXX-X"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                required
              />

              <Input
                label="Mobile / WhatsApp Number"
                placeholder="03XX-XXXXXXX"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <Select
                label="Primary Skill / Trade"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={categoryOptions}
              />

              <Select
                label="Work Experience"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                options={experienceOptions}
              />

              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Submit Application for Verification
                </Button>
              </div>

              <p className="text-center text-[11px] text-gray-500 pt-2">
                By submitting, you agree to FixKar.pk partner compliance policies and CNIC verification checks.
              </p>
            </form>
          </Card>
        </Container>
      </Section>
    </div>
  );
}
