"use client"

import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  ImageIcon,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Quote,
} from "lucide-react"
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link2 from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import { Toggle } from "@/components/ui/toggle"

interface TipTapEditorProps {
  content: string
  onContentChange: (content: string) => void
  showMediaBrowser: boolean
  setShowMediaBrowser: (show: boolean) => void
  simplified?: boolean
}

export default function TipTapEditor({
  content,
  onContentChange,
  showMediaBrowser,
  setShowMediaBrowser,
  simplified = false,
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link2.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: simplified ? "Write your post here..." : "Start writing your campaign content...",
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML())
    },
  })

  const addImage = useCallback(
    (url: string) => {
      if (editor) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    },
    [editor],
  )

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-md">
      <div className="border-b p-2 flex flex-wrap gap-1">
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Toggle bold"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Toggle italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Toggle underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Toggle>

        {!simplified && (
          <>
            <div className="w-px h-6 bg-border mx-1" />
            <Toggle
              size="sm"
              pressed={editor.isActive("heading", { level: 1 })}
              onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              aria-label="Toggle h1"
            >
              <Heading1 className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("heading", { level: 2 })}
              onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              aria-label="Toggle h2"
            >
              <Heading2 className="h-4 w-4" />
            </Toggle>
          </>
        )}

        <div className="w-px h-6 bg-border mx-1" />
        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Toggle bullet list"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Toggle ordered list"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        {!simplified && (
          <>
            <div className="w-px h-6 bg-border mx-1" />
            <Toggle
              size="sm"
              pressed={editor.isActive({ textAlign: "left" })}
              onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
              aria-label="Align left"
            >
              <AlignLeft className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive({ textAlign: "center" })}
              onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
              aria-label="Align center"
            >
              <AlignCenter className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive({ textAlign: "right" })}
              onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
              aria-label="Align right"
            >
              <AlignRight className="h-4 w-4" />
            </Toggle>

            <div className="w-px h-6 bg-border mx-1" />
            <Toggle
              size="sm"
              pressed={editor.isActive("blockquote")}
              onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
              aria-label="Toggle blockquote"
            >
              <Quote className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("codeBlock")}
              onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
              aria-label="Toggle code block"
            >
              <Code className="h-4 w-4" />
            </Toggle>
          </>
        )}

        <div className="w-px h-6 bg-border mx-1" />
        <Button variant="outline" size="sm" className="h-8" onClick={() => setShowMediaBrowser(true)}>
          <ImageIcon className="h-4 w-4 mr-2" />
          Add Media
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={() => {
            const url = window.prompt("Enter link URL")
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
        >
          <Link className="h-4 w-4 mr-2" />
          Add Link
        </Button>
      </div>

      <div
        className={`p-4 prose prose-sm max-w-none dark:prose-invert ${simplified ? "min-h-[150px]" : "min-h-[300px]"}`}
      >
        <EditorContent editor={editor} />

        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="flex items-center rounded-md border bg-background shadow-md">
              <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                className="rounded-none"
              >
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                className="rounded-none"
              >
                <Italic className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("underline")}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                className="rounded-none"
              >
                <UnderlineIcon className="h-4 w-4" />
              </Toggle>
            </div>
          </BubbleMenu>
        )}
      </div>
    </div>
  )
}

