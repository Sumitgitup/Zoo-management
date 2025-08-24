"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: PricingFeature[];
  button: {
    text: string;
  };
}

interface Pricing2Props {
  plans?: PricingPlan[];
}

const PricingComp = ({
  plans = [
    {
      id: "child-regular",
      name: "Child",
      description: "Regular Only",
      monthlyPrice: "19",
      yearlyPrice: "179",
      features: [
        { text: "Up to 5 team members" },
        { text: "Basic components library" },
        { text: "Community support" },
        { text: "1GB storage space" },
      ],
      button: {
        text: "Purchase",
      },
    },
    {
      id: "child-safari",
      name: "Child",
      description: "Regular & Safari",
      monthlyPrice: "49",
      yearlyPrice: "359",
      features: [
        { text: "Up to 5 team members" },
        { text: "Basic components library" },
        { text: "Community support" },
        { text: "1GB storage space" },
      ],
      button: {
        text: "Purchase",
      },
    },
    {
      id: "adult-regular",
      name: "Adult",
      description: "Regular Only",
      monthlyPrice: "19",
      yearlyPrice: "179",
      features: [
        { text: "Unlimited team members" },
        { text: "Advanced components" },
        { text: "Priority support" },
        { text: "Unlimited storage" },
      ],
      button: {
        text: "Purchase",
      },
    },

    {
      id: "adult-safari",
      name: "Adult",
      description: "Regular & Safari",
      monthlyPrice: "49",
      yearlyPrice: "359",
      features: [
        { text: "Unlimited team members" },
        { text: "Advanced components" },
        { text: "Priority support" },
        { text: "Unlimited storage" },
      ],
      button: {
        text: "Purchase",
      },
    },
  ],
}: Pricing2Props) => {
  const [isforeigners, setIsforeigners] = useState(false);

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-semibold text-pretty lg:text-6xl">
            Pricing
          </h2>
          <p className="text-muted-foreground lg:text-xl">Our Ticket Prices</p>
          <div className="flex items-center gap-3 text-lg">
            Indian
            <Switch
              checked={isforeigners}
              onCheckedChange={() => setIsforeigners(!isforeigners)}
            />
            foreigners
          </div>
          <div className="grid md:grid-cols-2 items-stretch gap-6 lg:gap-30 mt-20 md:flex-row">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className="flex w-80 flex-col justify-between text-left"
              >
                <CardHeader>
                  <CardTitle>
                    <p>{plan.name}</p>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                  <div className="flex items-end">
                    <span className="text-4xl font-semibold text-muted-foreground">
                      {isforeigners ? "$" : "₹"}
                    </span>
                    <span className="text-4xl font-semibold">
                      {isforeigners ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-6" />
                  <ul className="space-y-4">
                    <li>
                      {plan.description === "Regular Only"
                        ? "In this You'll get Reptile House and Bird Sanctuary"
                        : "In this You'll get Regular & Safari Zone both"}
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button asChild className="w-full">
                    <p>Purchase at Counter</p>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { PricingComp };
