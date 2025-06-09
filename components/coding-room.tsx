"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/seperator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Play, Send, Users, Zap } from "lucide-react"
import { MonacoEditor } from "@/components/monaco-editor"

export default function CodingRoom() {
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds
  const [code, setCode] = useState(`class Solution:
    def twoSum(num1, num2):
        # Write your solution here
        return ()`)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleCodeChange = (value: string) => {
    setCode(value)
  }

  const handleSubmit = async () => {
    const payload = {
      source_code: code,
      language_id: 71, // Assuming 71 corresponds to Python
      function_name: "add",
      test_cases: [
        { input: "1, 2", expected_output: "3" },
        { input: "10, 20", expected_output: "30" },
      ],
    }
  
    try {
      const response = await fetch("http://localhost:5050/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
  
      const result = await response.json()
      console.log("Submission Result:", result)
      // Handle the result (e.g., show success message or result to the user)
    } catch (error) {
      console.error("Submission failed:", error)
      // Handle the error (e.g., show error message to the user)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">BattleCode</h1>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              Room: #ABC123
            </Badge>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-green-100 text-green-700">You</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">You</span>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-700">OP</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Opponent</span>
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-lg font-mono">
              <Clock className="h-5 w-5" />
              <span className={timeLeft < 300 ? "text-red-500" : "text-foreground"}>{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor - Left Side */}
        <div className="flex-1 flex flex-col border-r">
          <div className="border-b bg-muted/50 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Python</Badge>
              <Badge variant="outline">Medium</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Play className="h-3 w-3" />
                Run
              </Button>
              <Button size="sm" className="flex items-center gap-1" onClick={handleSubmit}>
                <Send className="h-3 w-3" />
                Submit
              </Button>
            </div>
          </div>

          <div className="flex-1 p-0">
            <div className="h-full">
              <MonacoEditor value={code} onChange={handleCodeChange} language="python" />
            </div>
          </div>
        </div>

        {/* Problem Statement - Right Side */}
        <div className="w-96 flex flex-col bg-muted/20">
          <div className="border-b bg-muted/50 px-4 py-2">
            <h2 className="font-semibold">Problem Statement</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Two Sum</CardTitle>
                <CardDescription>Find two numbers in an array that add up to a target sum.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Given an array of integers <code className="bg-muted px-1 py-0.5 rounded text-xs">nums</code> and an
                    integer <code className="bg-muted px-1 py-0.5 rounded text-xs">target</code>, return indices of the
                    two numbers such that they add up to target.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    You may assume that each input would have exactly one solution, and you may not use the same element
                    twice.
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Example 1</h4>
                  <div className="bg-muted p-3 rounded-md text-sm font-mono">
                    <div>
                      <strong>Input:</strong> nums = [2,7,11,15], target = 9
                    </div>
                    <div>
                      <strong>Output:</strong> [0,1]
                    </div>
                    <div className="text-muted-foreground mt-1">
                      <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Example 2</h4>
                  <div className="bg-muted p-3 rounded-md text-sm font-mono">
                    <div>
                      <strong>Input:</strong> nums = [3,2,4], target = 6
                    </div>
                    <div>
                      <strong>Output:</strong> [1,2]
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Constraints</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 2 ≤ nums.length ≤ 10⁴</li>
                    <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                    <li>• -10⁹ ≤ target ≤ 10⁹</li>
                    <li>• Only one valid answer exists</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Function Signature</h4>
                  <div className="bg-muted p-3 rounded-md text-sm font-mono">
                    def twoSum(self, nums: List[int], target: int) -{">"} List[int]:
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
