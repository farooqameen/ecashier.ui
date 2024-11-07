'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const items = {
  "Category 1": [
    { name: "Item 1", price: 10 },
    { name: "Item 2", price: 15 },
    { name: "Item 3", price: 20 },
  ],
  "Category 2": [
    { name: "Item 4", price: 25 },
    { name: "Item 5", price: 30 },
    { name: "Item 6", price: 35 },
  ],
  "Category 3": [
    { name: "Item 7", price: 40 },
    { name: "Item 8", price: 45 },
    { name: "Item 9", price: 50 },
  ],
}

export default function MultistepForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    selectedItem: '',
    email: '',
    phone: '',
  })
  const [total, setTotal] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, selectedItem: value })
    setTotal(Object.values(items).flat().find(item => item.name === value)?.price || 0)
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Card className="w-full max-w-md border-2 border-black">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#0039a6]">Student eCashier</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-[#cc092f] rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Student Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input id="studentId" name="studentId" value={formData.studentId} onChange={handleInputChange} required />
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-lg font-semibold text-[#0039a6]">Welcome, {formData.name}</p>
                <div>
                  <Label htmlFor="item">Select an item</Label>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an item" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(items).map(([category, categoryItems]) => (
                        <div key={category}>
                          <h3 className="font-semibold text-[#0039a6] px-2 py-1">{category}</h3>
                          {categoryItems.map((item) => (
                            <SelectItem key={item.name} value={item.name}>
                              {item.name} - ${item.price}
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-right font-semibold text-[#0039a6]">Total: ${total}</p>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="font-semibold text-[#0039a6]">Selected Item: {formData.selectedItem}</p>
                  <p className="font-semibold text-[#0039a6]">Total: ${total}</p>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button onClick={handlePrevious} variant="outline">
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={handleNext} className="bg-[#cc092f] hover:bg-[#a00725] text-white">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-[#cc092f] hover:bg-[#a00725] text-white">
              Checkout
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}