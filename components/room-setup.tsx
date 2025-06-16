"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/seperator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Zap, Users, Clock, Code, Trophy, Share2, Router } from "lucide-react"
import { useToast } from "@/lib/use-toast"
import { create } from "domain"
import { useRouter } from "next/navigation"

const languages = [
  { value: "python", label: "Python", icon: "🐍" },
  { value: "javascript", label: "JavaScript", icon: "🟨" },
  { value: "java", label: "Java", icon: "☕" },
  { value: "cpp", label: "C++", icon: "⚡" },
  { value: "csharp", label: "C#", icon: "🔷" },
  { value: "go", label: "Go", icon: "🔵" },
]

const difficulties = [
  { value: "Easy", label: "Easy", color: "bg-green-500", description: "Perfect for beginners" },
  { value: "Medium", label: "Medium", color: "bg-yellow-500", description: "Intermediate challenges" },
  { value: "Hard", label: "Hard", color: "bg-red-500", description: "Expert level problems" },
]

const durations = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
]

export default function RoomSetup() {
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [selectedDuration, setSelectedDuration] = useState("30")
  const [roomId, setRoomId] = useState("")
  const [isRoomGenerated, setIsRoomGenerated] = useState(false)
  const { toast } = useToast()
  const router = useRouter()



 const createRoom = async () => {
  try {
    const response = await fetch("http://localhost:5050/api/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: selectedLanguage,
        difficulty: selectedDifficulty,
        duration: selectedDuration,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create room");
    }

    const data = await response.json();
    localStorage.setItem("roomId", data.room_code); // Store room code in local storage
    console.log("Room created:", data);
    setRoomId(data.room_code); 
    setIsRoomGenerated(true);  

    
  } catch (error) {
    console.error("Error creating room:", error);
    toast({
      title: "Error",
      description: "Failed to create room. Please try again.",
      variant: "destructive",
    });
  }
};

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId)
      toast({
        title: "Room ID Copied!",
        description: "Share this ID with your opponent to start the battle.",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the room ID manually.",
        variant: "destructive",
      })
    }
  }

  const copyRoomLink = async () => {
    const roomLink = `${window.location.origin}/room/${roomId}`
    try {
      await navigator.clipboard.writeText(roomLink)
      toast({
        title: "Room Link Copied!",
        description: "Share this link with your opponent to join directly.",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the room link manually.",
        variant: "destructive",
      })
    }
  }

  const isFormValid = selectedLanguage && selectedDifficulty && selectedDuration

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">BattleCode</h1>
          </div>
          <p className="text-muted-foreground text-lg">Create your coding battle room and challenge your friends</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Room Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Room Configuration
              </CardTitle>
              <CardDescription>Set up your coding battle preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language Selection */}
              <div className="space-y-2">
                <Label htmlFor="language">Programming Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        <div className="flex items-center gap-2">
                          <span>{lang.icon}</span>
                          <span>{lang.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Difficulty Selection */}
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((diff) => (
                      <SelectItem key={diff.value} value={diff.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${diff.color}`}></div>
                          <div>
                            <div className="font-medium">{diff.label}</div>
                            <div className="text-xs text-muted-foreground">{diff.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration Selection */}
              <div className="space-y-2">
                <Label htmlFor="duration">Battle Duration</Label>
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value}>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{duration.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={createRoom} disabled={!isFormValid} className="w-full" size="lg">
                <Trophy className="h-4 w-4 mr-2" />
                Generate Battle Room
              </Button>
            </CardContent>
          </Card>

          {/* Room Details & Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Room Details
              </CardTitle>
              <CardDescription>Share your room with opponents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isRoomGenerated ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Configure your room settings and generate a room ID to get started</p>
                </div>
              ) : (
                <>
                  {/* Room ID Display */}
                  <div className="space-y-2">
                    <Label>Room ID</Label>
                    <div className="flex gap-2">
                      <Input value={roomId} readOnly className="font-mono text-lg text-center tracking-wider" />
                      <Button variant="outline" size="icon" onClick={copyRoomId}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Room Settings Summary */}
                  <div className="space-y-3">
                    <Label>Room Settings</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                        <span>{languages.find((l) => l.value === selectedLanguage)?.icon}</span>
                        <span className="text-sm font-medium">
                          {languages.find((l) => l.value === selectedLanguage)?.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                        <div
                          className={`w-3 h-3 rounded-full ${difficulties.find((d) => d.value === selectedDifficulty)?.color}`}
                        ></div>
                        <span className="text-sm font-medium">
                          {difficulties.find((d) => d.value === selectedDifficulty)?.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-md col-span-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {durations.find((d) => d.value === selectedDuration)?.label}
                        </span>
                      </div>
                    </div>
                    {/* Redirect Button */}
  <Button
    onClick={() => router.push(`/room/${roomId}`)} // Redirect to room/[roomId]
    disabled={!roomId} // Disable button if roomId is not generated
    className="w-full mt-4"
  >
    <Zap className="h-4 w-4 mr-2" />
    Enter Battle Room
  </Button>
                  </div>

                  <Separator />

                  {/* Sharing Options */}
                  <div className="space-y-3">
                    <Label>Share Room</Label>
                    <div className="grid gap-2">
                      <Button variant="outline" onClick={copyRoomLink} className="justify-start">
                        <Share2 className="h-4 w-4 mr-2" />
                        Copy Room Link
                      </Button>
                      <Button variant="outline" onClick={copyRoomId} className="justify-start">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Room ID
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Launch Room Button */}
                  <Button className="w-full" size="lg">
                    <Zap className="h-4 w-4 mr-2" />
                    Enter Battle Room
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">
                  1
                </div>
                <h3 className="font-medium">Configure Room</h3>
                <p className="text-sm text-muted-foreground">Choose your language, difficulty, and duration</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">
                  2
                </div>
                <h3 className="font-medium">Share Room ID</h3>
                <p className="text-sm text-muted-foreground">Send the room ID or link to your opponent</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">
                  3
                </div>
                <h3 className="font-medium">Start Battle</h3>
                <p className="text-sm text-muted-foreground">Enter the room and begin your coding challenge</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
