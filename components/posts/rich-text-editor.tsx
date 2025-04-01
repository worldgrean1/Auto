"use client"

import type React from "react"

import { useEffect } from "react"

import { useState, useRef, useCallback } from "react"
import { Bold, Italic, Underline, List, ListOrdered, Link, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Common emoji categories
const EMOJI_CATEGORIES = {
  smileys: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇"],
  gestures: ["👍", "👎", "👌", "✌️", "🤞", "👏", "🙌", "🤝", "🙏", "👐"],
  symbols: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "💔", "✨", "🔥"],
  objects: ["📱", "💻", "⌚", "📷", "🎁", "🏆", "📊", "📈", "💡", "📝"],
}

// Popular hashtags by category
const POPULAR_HASHTAGS = {
  marketing: ["#marketing", "#socialmedia", "#digitalmarketing", "#branding", "#contentmarketing"],
  business: ["#business", "#entrepreneur", "#startup", "#success", "#leadership"],
  tech: ["#tech", "#technology", "#innovation", "#ai", "#software"],
  lifestyle: ["#lifestyle", "#travel", "#fitness", "#food", "#fashion"],
}

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function RichTextEditor({ value, onChange, className }: RichTextEditorProps) {
  const [text, setText] = useState(value || "")
  const [selection, setSelection] = useState({ start: 0, end: 0 })
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [showHashtagSuggestions, setShowHashtagSuggestions] = useState(false)
  const [hashtagQuery, setHashtagQuery] = useState("")
  const [showHashtags, setShowHashtags] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Popular hashtags for suggestions
  const popularHashtags = [
    "marketing",
    "socialmedia",
    "digital",
    "business",
    "entrepreneur",
    "success",
    "motivation",
    "startup",
    "branding",
    "contentcreator",
    "influencer",
    "growth",
    "strategy",
    "sales",
    "leadership",
  ]

  // Filter hashtags based on query
  const filteredHashtags = popularHashtags
    .filter((tag) => tag.toLowerCase().includes(hashtagQuery.toLowerCase()))
    .slice(0, 5)

  useEffect(() => {
    setText(value || "")
  }, [value])

  useEffect(() => {
    onChange(text)

    // Check for hashtag input
    const lastWord = getWordBeforeCursor()
    if (lastWord.startsWith("#") && lastWord.length > 1) {
      setHashtagQuery(lastWord.substring(1))
      setShowHashtagSuggestions(true)
    } else {
      setShowHashtagSuggestions(false)
    }
  }, [text, onChange])

  const getWordBeforeCursor = () => {
    if (!textareaRef.current) return ""

    const cursorPos = textareaRef.current.selectionStart
    const textBeforeCursor = text.substring(0, cursorPos)
    const words = textBeforeCursor.split(/\s/)
    return words[words.length - 1]
  }

  const handleSelectionChange = () => {
    if (textareaRef.current) {
      setSelection({
        start: textareaRef.current.selectionStart,
        end: textareaRef.current.selectionEnd,
      })
    }
  }

  const insertFormatting = (before: string, after: string = before) => {
    if (textareaRef.current) {
      const start = selection.start
      const end = selection.end
      const selectedText = text.substring(start, end)
      const newText = text.substring(0, start) + before + selectedText + after + text.substring(end)

      setText(newText)

      // Focus and set cursor position after formatting
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus()
          textareaRef.current.setSelectionRange(start + before.length, end + before.length)
        }
      }, 0)
    }
  }

  const insertLink = () => {
    if (linkUrl && textareaRef.current) {
      const start = selection.start
      const end = selection.end
      const selectedText = text.substring(start, end)
      const linkText = selectedText || linkUrl
      const markdownLink = `[${linkText}](${linkUrl})`

      const newText = text.substring(0, start) + markdownLink + text.substring(end)
      setText(newText)
      setShowLinkInput(false)
      setLinkUrl("")
    }
  }

  const insertEmoji = (emoji: any) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart
      const newText = text.substring(0, start) + emoji.native + text.substring(start)
      setText(newText)

      // Set cursor position after emoji
      setTimeout(() => {
        if (textareaRef.current) {
          const newPosition = start + emoji.native.length
          textareaRef.current.focus()
          textareaRef.current.setSelectionRange(newPosition, newPosition)
        }
      }, 0)
    }
  }

  const insertHashtag = (hashtag: string) => {
    if (textareaRef.current) {
      const cursorPos = textareaRef.current.selectionStart
      const textBeforeCursor = text.substring(0, cursorPos)
      const lastHashtagStart = textBeforeCursor.lastIndexOf("#")

      if (lastHashtagStart >= 0) {
        const newText = text.substring(0, lastHashtagStart) + `#${hashtag} ` + text.substring(cursorPos)
        setText(newText)

        // Set cursor position after hashtag
        setTimeout(() => {
          if (textareaRef.current) {
            const newPosition = lastHashtagStart + hashtag.length + 2 // +2 for # and space
            textareaRef.current.focus()
            textareaRef.current.setSelectionRange(newPosition, newPosition)
          }
        }, 0)
      }

      setShowHashtagSuggestions(false)
    }
  }

  // Handle formatting
  const handleFormat = (format: string) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = text.substring(start, end)

    let formattedText = ""
    let cursorPosition = 0

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        cursorPosition = 2
        break
      case "italic":
        formattedText = `*${selectedText}*`
        cursorPosition = 1
        break
      case "underline":
        formattedText = `_${selectedText}_`
        cursorPosition = 1
        break
      case "list":
        formattedText = `\n- ${selectedText}`
        cursorPosition = 3
        break
      case "ordered-list":
        formattedText = `\n1. ${selectedText}`
        cursorPosition = 4
        break
      case "link":
        formattedText = `[${selectedText}](url)`
        cursorPosition = 1
        break
      default:
        return
    }

    const newValue = text.substring(0, start) + formattedText + text.substring(end)
    setText(newValue)
    onChange(newValue)

    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus()
      if (selectedText) {
        textarea.setSelectionRange(start + formattedText.length, start + formattedText.length)
      } else {
        textarea.setSelectionRange(start + cursorPosition, start + cursorPosition)
      }
    }, 0)
  }

  // Insert emoji
  const insertEmoji2 = (emoji: string) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart

    const newValue = text.substring(0, start) + emoji + text.substring(start)
    setText(newValue)
    onChange(newValue)

    // Set cursor position after emoji
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + emoji.length, start + emoji.length)
    }, 0)
  }

  // Insert hashtag
  const insertHashtag2 = (hashtag: string) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart

    const newValue = text.substring(0, start) + hashtag + " " + text.substring(start)
    setText(newValue)
    onChange(newValue)

    // Set cursor position after hashtag
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + hashtag.length + 1, start + hashtag.length + 1)
    }, 0)

    setShowHashtags(false)
  }

  // Check for hashtag typing
  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      setText(newValue)
      onChange(newValue)

      // Show hashtag suggestions when typing #
      const lastChar = newValue.charAt(e.target.selectionStart - 1)
      setShowHashtags(lastChar === "#")
    },
    [onChange],
  )

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="icon" onClick={() => handleFormat("bold")} title="Bold">
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" size="icon" onClick={() => handleFormat("italic")} title="Italic">
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" size="icon" onClick={() => handleFormat("underline")} title="Underline">
          <Underline className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" size="icon" onClick={() => handleFormat("list")} title="Bullet List">
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => handleFormat("ordered-list")}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" size="icon" onClick={() => handleFormat("link")} title="Insert Link">
          <Link className="h-4 w-4" />
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="outline" size="icon" title="Insert Emoji">
              <Smile className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <Tabs defaultValue="smileys">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="smileys">Smileys</TabsTrigger>
                <TabsTrigger value="gestures">Gestures</TabsTrigger>
                <TabsTrigger value="symbols">Symbols</TabsTrigger>
                <TabsTrigger value="objects">Objects</TabsTrigger>
              </TabsList>
              <TabsContent value="smileys" className="mt-2">
                <div className="grid grid-cols-8 gap-2">
                  {EMOJI_CATEGORIES.smileys.map((emoji) => (
                    <Button key={emoji} variant="ghost" className="h-8 w-8 p-0" onClick={() => insertEmoji2(emoji)}>
                      {emoji}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="gestures" className="mt-2">
                <div className="grid grid-cols-8 gap-2">
                  {EMOJI_CATEGORIES.gestures.map((emoji) => (
                    <Button key={emoji} variant="ghost" className="h-8 w-8 p-0" onClick={() => insertEmoji2(emoji)}>
                      {emoji}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="symbols" className="mt-2">
                <div className="grid grid-cols-8 gap-2">
                  {EMOJI_CATEGORIES.symbols.map((emoji) => (
                    <Button key={emoji} variant="ghost" className="h-8 w-8 p-0" onClick={() => insertEmoji2(emoji)}>
                      {emoji}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="objects" className="mt-2">
                <div className="grid grid-cols-8 gap-2">
                  {EMOJI_CATEGORIES.objects.map((emoji) => (
                    <Button key={emoji} variant="ghost" className="h-8 w-8 p-0" onClick={() => insertEmoji2(emoji)}>
                      {emoji}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover>
      </div>

      {showLinkInput && (
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Enter URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="flex-1"
          />
          <Button type="button" size="sm" onClick={insertLink}>
            Insert
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowLinkInput(false)
              setLinkUrl("")
            }}
          >
            Cancel
          </Button>
        </div>
      )}

      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextareaChange}
          onSelect={handleSelectionChange}
          onKeyUp={handleSelectionChange}
          onMouseUp={handleSelectionChange}
          onFocus={handleSelectionChange}
          placeholder="What's on your mind? Type # for hashtags..."
          className="min-h-[200px] resize-y"
        />

        {showHashtagSuggestions && filteredHashtags.length > 0 && (
          <div className="absolute z-10 bg-background border rounded-md shadow-md mt-1 w-48">
            {filteredHashtags.map((tag) => (
              <button
                key={tag}
                className="w-full text-left px-3 py-2 hover:bg-muted text-sm"
                onClick={() => insertHashtag(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {showHashtags && (
          <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-md">
            <Tabs defaultValue="marketing">
              <TabsList className="w-full">
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="tech">Tech</TabsTrigger>
                <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
              </TabsList>
              <TabsContent value="marketing" className="p-2">
                <div className="flex flex-wrap gap-2">
                  {POPULAR_HASHTAGS.marketing.map((hashtag) => (
                    <Button key={hashtag} variant="secondary" size="sm" onClick={() => insertHashtag2(hashtag)}>
                      {hashtag}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="business" className="p-2">
                <div className="flex flex-wrap gap-2">
                  {POPULAR_HASHTAGS.business.map((hashtag) => (
                    <Button key={hashtag} variant="secondary" size="sm" onClick={() => insertHashtag2(hashtag)}>
                      {hashtag}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="tech" className="p-2">
                <div className="flex flex-wrap gap-2">
                  {POPULAR_HASHTAGS.tech.map((hashtag) => (
                    <Button key={hashtag} variant="secondary" size="sm" onClick={() => insertHashtag2(hashtag)}>
                      {hashtag}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="lifestyle" className="p-2">
                <div className="flex flex-wrap gap-2">
                  {POPULAR_HASHTAGS.lifestyle.map((hashtag) => (
                    <Button key={hashtag} variant="secondary" size="sm" onClick={() => insertHashtag2(hashtag)}>
                      {hashtag}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      <div className="text-xs text-muted-foreground">
        <p>Formatting: Use **bold**, *italic*, or _underline_ to format your text.</p>
        <p>Type # to see hashtag suggestions.</p>
      </div>
    </div>
  )
}

