"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"

interface SimpleEditorProps {
  content: string
  onContentChange: (content: string) => void
  onAddMedia: () => void
}

export function SimpleEditor({ content, onContentChange, onAddMedia }: SimpleEditorProps) {
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null)

  const handleTextareaSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement
    setSelection({
      start: target.selectionStart,
      end: target.selectionEnd,
    })
  }

  const applyFormat = (format: string) => {
    if (!selection) return

    let newContent = content
    const selectedText = content.substring(selection.start, selection.end)
    let formattedText = ""

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        break
      case "italic":
        formattedText = `*${selectedText}*`
        break
      case "underline":
        formattedText = `_${selectedText}_`
        break
      case "bullet-list":
        formattedText = selectedText
          .split("\n")
          .map((line) => `• ${line}`)
          .join("\n")
        break
      case "ordered-list":
        formattedText = selectedText
          .split("\n")
          .map((line, i) => `${i + 1}. ${line}`)
          .join("\n")
        break
      case "link":
        const url = prompt("Enter URL:", "https://")
        if (url) {
          formattedText = `[${selectedText}](${url})`
        } else {
          return
        }
        break
      case "align-left":
        formattedText = `<div style="text-align: left">${selectedText}</div>`
        break
      case "align-center":
        formattedText = `<div style="text-align: center">${selectedText}</div>`
        break
      case "align-right":
        formattedText = `<div style="text-align: right">${selectedText}</div>`
        break
      default:
        return
    }

    newContent = content.substring(0, selection.start) + formattedText + content.substring(selection.end)

    onContentChange(newContent)
  }

  return (
    <div className="border rounded-md">
      <div className="border-b p-2 flex flex-wrap gap-1">
        <Toggle size="sm" onClick={() => applyFormat("bold")} aria-label="Bold">
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" onClick={() => applyFormat("italic")} aria-label="Italic">
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" onClick={() => applyFormat("underline")} aria-label="Underline">
          <Underline className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1" />

        <Toggle size="sm" onClick={() => applyFormat("bullet-list")} aria-label="Bullet List">
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" onClick={() => applyFormat("ordered-list")} aria-label="Ordered List">
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1" />

        <Toggle size="sm" onClick={() => applyFormat("align-left")} aria-label="Align Left">
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" onClick={() => applyFormat("align-center")} aria-label="Align Center">
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" onClick={() => applyFormat("align-right")} aria-label="Align Right">
          <AlignRight className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1" />

        <Button variant="outline" size="sm" className="h-8" onClick={() => applyFormat("link")}>
          <Link className="h-4 w-4 mr-2" />
          Add Link
        </Button>

        <Button variant="outline" size="sm" className="h-8" onClick={onAddMedia}>
          <ImageIcon className="h-4 w-4 mr-2" />
          Add Media
        </Button>
      </div>

      <div className="p-4">
        <Textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          onSelect={handleTextareaSelect}
          placeholder="Write your campaign content here..."
          className="min-h-[300px] border-0 focus-visible:ring-0 p-0 resize-none"
        />
      </div>
    </div>
  )
}

