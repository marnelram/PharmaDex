"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Choose Your Plan</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Get more energy to play more quizzes. Choose the plan that works best
          for you.
        </p>
      </div>

      {/* Pricing tabs for monthly/yearly toggle - future implementation */}
      <Tabs defaultValue="monthly" className="w-full max-w-5xl mx-auto mb-8">
        <TabsList className="grid w-[300px] grid-cols-2 mx-auto">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <Card className="border-2 relative flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">Free</CardTitle>
                <CardDescription>Basic access to quizzes</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>5 energy per day</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Basic quiz access</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Leaderboard participation</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Current Plan
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className="border-2 border-primary relative flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-white">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Premium</CardTitle>
                <CardDescription>Enhanced quiz experience</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$4.99</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>20 energy per day</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Faster energy regeneration</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Premium badges</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>No ads</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Coming Soon</Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 relative flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">Pro</CardTitle>
                <CardDescription>Ultimate PharmaDex experience</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$9.99</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Unlimited energy</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Exclusive Pro badges</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Custom quiz creation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="yearly" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan (Yearly) */}
            <Card className="border-2 relative flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">Free</CardTitle>
                <CardDescription>Basic access to quizzes</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-gray-500 ml-2">/year</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>5 energy per day</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Basic quiz access</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Leaderboard participation</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Current Plan
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Plan (Yearly) */}
            <Card className="border-2 border-primary relative flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-white">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Premium</CardTitle>
                <CardDescription>Enhanced quiz experience</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$47.88</span>
                  <span className="text-gray-500 ml-2">/year</span>
                </div>
                <div className="mt-1 text-green-600 text-sm font-medium">
                  Save $11.97
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>20 energy per day</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Faster energy regeneration</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Premium badges</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>No ads</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Coming Soon</Button>
              </CardFooter>
            </Card>

            {/* Pro Plan (Yearly) */}
            <Card className="border-2 relative flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">Pro</CardTitle>
                <CardDescription>Ultimate PharmaDex experience</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$95.88</span>
                  <span className="text-gray-500 ml-2">/year</span>
                </div>
                <div className="mt-1 text-green-600 text-sm font-medium">
                  Save $23.94
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Unlimited energy</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Exclusive Pro badges</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Custom quiz creation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Energy Packs Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          One-time Energy Packs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Energy Pack 1 */}
          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Small Pack</CardTitle>
              <div className="mt-4 flex justify-center">
                <div className="text-2xl font-bold">$0.99</div>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">10</span>
              </div>
              <p>10 Energy Points</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Coming Soon
              </Button>
            </CardFooter>
          </Card>

          {/* Energy Pack 2 */}
          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Medium Pack</CardTitle>
              <div className="mt-4 flex justify-center">
                <div className="text-2xl font-bold">$1.99</div>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">25</span>
              </div>
              <p>25 Energy Points</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Coming Soon
              </Button>
            </CardFooter>
          </Card>

          {/* Energy Pack 3 */}
          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Large Pack</CardTitle>
              <div className="mt-4 flex justify-center">
                <div className="text-2xl font-bold">$4.99</div>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">75</span>
              </div>
              <p>75 Energy Points</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Coming Soon
              </Button>
            </CardFooter>
          </Card>

          {/* Energy Pack 4 */}
          <Card className="border-2 border-primary">
            <div className="absolute -top-3 right-3">
              <Badge className="bg-primary text-white">Best Value</Badge>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Mega Pack</CardTitle>
              <div className="mt-4 flex justify-center">
                <div className="text-2xl font-bold">$9.99</div>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">175</span>
              </div>
              <p>175 Energy Points</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Coming Soon</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Energy System Explanation */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">How Energy Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="font-medium mb-2">Daily Regeneration</h3>
            <p className="text-sm text-gray-600">
              Your energy regenerates daily based on your subscription plan.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="font-medium mb-2">Play Quizzes</h3>
            <p className="text-sm text-gray-600">
              Each quiz requires energy to play. Different quiz types may cost
              different amounts.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="font-medium mb-2">Buy More</h3>
            <p className="text-sm text-gray-600">
              Need more energy? Purchase energy packs or upgrade your
              subscription.
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <div className="p-4 bg-yellow-50 rounded-lg inline-block">
            <p className="text-sm font-medium text-yellow-800">
              Energy system is coming soon! This is a preview of how it will
              work.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="font-bold mb-2">What is energy used for?</h3>
            <p className="text-gray-600">
              Energy is consumed when you take quizzes. Each quiz will require a
              specific amount of energy to play.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="font-bold mb-2">
              How does energy regeneration work?
            </h3>
            <p className="text-gray-600">
              Energy regenerates once per day. Free users get 5 energy points
              daily, while premium users get more energy and faster
              regeneration.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="font-bold mb-2">
              Do my unused energy points expire?
            </h3>
            <p className="text-gray-600">
              No, your energy points do not expire. However, there is a maximum
              cap on how much energy you can store based on your subscription
              plan.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="font-bold mb-2">Can I gift energy to friends?</h3>
            <p className="text-gray-600">
              Not yet, but we plan to add energy gifting in a future update!
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Power Up Your PharmaDex Experience?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Choose a subscription plan or energy pack that fits your needs.
        </p>
        <Button size="lg" className="mx-auto">
          Coming Soon
        </Button>
        <p className="mt-4 text-sm text-gray-500">
          Energy system implementation is in progress.
        </p>
      </div>
    </div>
  );
}
