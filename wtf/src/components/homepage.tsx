'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Coffee, Pizza, Music, Book, Lightbulb } from "lucide-react"

export function HomepageComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center text-purple-800 mb-2">
            Real Official and True One and Only
          </CardTitle>
          <CardTitle className="text-2xl font-bold text-center text-purple-700">
            International Students Office
          </CardTitle>
          <CardTitle className="text-xl font-semibold text-center text-purple-600 mb-4">
            of The Third Floor Residents
          </CardTitle>
          <Badge className="mx-auto" variant="outline">Room 327</Badge>
          <CardDescription className="text-center mt-4 italic">
            "Where dreams come true... if your dreams involve instant noodles and late-night study sessions!"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Globe className="mr-2 text-blue-500" />
              <span>Serving students from 0.5 countries</span>
            </div>
            <div className="flex items-center">
              <Coffee className="mr-2 text-brown-500" />
              <span>Fueled by 99% caffeine</span>
            </div>
            <div className="flex items-center">
              <Pizza className="mr-2 text-red-500" />
              <span>Official pizza consumption zone</span>
            </div>
            <div className="flex items-center">
              <Music className="mr-2 text-green-500" />
              <span>Silent disco every full moon</span>
            </div>
          </div>
          <p className="text-center mb-4">
            Welcome to the most exclusive (and only) international student office on the third floor! 
            We're here to solve all your problems, or at least pretend to while eating snacks.
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <Button variant="outline">
              <Book className="mr-2" /> Borrow a Textbook*
            </Button>
            <Button variant="outline">
              <Lightbulb className="mr-2" /> Get "Advice"
            </Button>
          </div>
          <p className="text-xs text-center text-gray-500">
            * Textbooks may or may not be related to your actual course. No refunds.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-center text-gray-600">
            Office Hours: Whenever we're awake and not in class (so basically never)
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}