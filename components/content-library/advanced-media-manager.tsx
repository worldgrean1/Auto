"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  SearchIcon,
  Upload,
  Grid,
  List,
  MoreHorizontal,
  Edit,
  Download,
  Trash,
  Tag,
  Image,
  Video,
  FileAudio,
  File,
} from "lucide-react"

interface MediaFile {
  id: string
  name: string
  type: "image" | "video" | "audio" | "document"
  url: string
  size: string
  dimensions?: string
  duration?: string
  tags: string[]
  createdAt: string
  updatedAt?: string
}

export function AdvancedMediaManager() {
  const { toast } = useToast()
  const fileInputRef = useRef(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)

  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: "img_1",
      name: "Product Banner",
      type: "image",
      url: "/placeholder.svg?height=600&width=800",
      size: "1.2 MB",
      dimensions: "1920x1080px",
      tags: ["banner", "product"],
      createdAt: "2023-07-15T14:30:00Z",
    },
    {
      id: "img_2",
      name: "Team Photo",
      type: "image",
      url: "/placeholder.svg?height=400&width=600",
      size: "0.8 MB",
      dimensions: "1200x800px",
      tags: ["team", "office"],
      createdAt: "2023-07-10T10:15:00Z",
    },
    {
      id: "vid_1",
      name: "Product Demo",
      type: "video",
      url: "/placeholder.svg?height=400&width=600",
      size: "15.4 MB",
      duration: "2:30",
      tags: ["demo", "product"],
      createdAt: "2023-07-05T09:20:00Z",
    },
    {
      id: "aud_1",
      name: "Podcast Episode",
      type: "audio",
      url: "/placeholder.svg?height=300&width=300",
      size: "8.7 MB",
      duration: "32:15",
      tags: ["podcast", "interview"],
      createdAt: "2023-06-28T15:45:00Z",
    },
    {
      id: "doc_1",
      name: "Presentation Deck",
      type: "document",
      url: "/placeholder.svg?height=300&width=300",
      size: "2.5 MB",
      tags: ["presentation", "meeting"],
      createdAt: "2023-06-20T11:30:00Z",
    },
  ])

  // Dialogs state
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [fileDetailsOpen, setFileDetailsOpen] = useState(false)
  const [editTagsOpen, setEditTagsOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [newTagValue, setNewTagValue] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleTabChange = (value: string) => {
    setSelectedTab(value)
  }

  const filteredFiles = mediaFiles.filter((file) => {
    // Filter by search query
    const matchesSearch =
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    // Filter by tab/type
    const matchesType = selectedTab === "all" || file.type === selectedTab

    return matchesSearch && matchesType
  })

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      simulateUpload(files[0])
    }
  }

  const simulateUpload = (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    // Determine file type
    let type: "image" | "video" | "audio" | "document" = "document"
    if (file.type.startsWith("image/")) type = "image"
    else if (file.type.startsWith("video/")) type = "video"
    else if (file.type.startsWith("audio/")) type = "audio"

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)

          // Add the new file to our list
          const newFile: MediaFile = {
            id: `file_${Date.now()}`,
            name: file.name,
            type,
            url: "/placeholder.svg?height=400&width=600", // In a real app, this would be the uploaded file URL
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            tags: [],
            createdAt: new Date().toISOString(),
          }

          setMediaFiles((prev) => [newFile, ...prev])

          toast({
            title: "File uploaded successfully",
            description: `${file.name} has been uploaded.`,
          })

          setIsUploading(false)
          return 0
        }
        return prev + 5
      })
    }, 200)
  }

  const handleViewDetails = (file: MediaFile) => {
    setSelectedFile(file)
    setFileDetailsOpen(true)
  }

  const handleEditTags = () => {
    setEditTagsOpen(true)
    setFileDetailsOpen(false)
  }

  const handleAddTag = () => {
    if (newTagValue && selectedFile && !selectedFile.tags.includes(newTagValue)) {
      const updatedFile = {
        ...selectedFile,
        tags: [...selectedFile.tags, newTagValue],
      }

      setMediaFiles((files) => files.map((file) => (file.id === updatedFile.id ? updatedFile : file)))

      setSelectedFile(updatedFile)
      setNewTagValue("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    if (selectedFile) {
      const updatedFile = {
        ...selectedFile,
        tags: selectedFile.tags.filter((tag) => tag !== tagToRemove),
      }

      setMediaFiles((files) => files.map((file) => (file.id === updatedFile.id ? updatedFile : file)))

      setSelectedFile(updatedFile)
    }
  }

  const handleDeleteFile = () => {
    if (selectedFile) {
      setMediaFiles((files) => files.filter((file) => file.id !== selectedFile.id))
      setSelectedFile(null)
      setDeleteDialogOpen(false)

      toast({
        title: "File deleted",
        description: `${selectedFile.name} has been deleted.`,
      })
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Image className="h-6 w-6 text-blue-500" />
      case "video":
        return <Video className="h-6 w-6 text-purple-500" />
      case "audio":
        return <FileAudio className="h-6 w-6 text-amber-500" />
      default:
        return <File className="h-6 w-6 text-gray-500" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Media Library</CardTitle>
            <CardDescription>Manage your media assets</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
              {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              <span className="sr-only">Toggle view</span>
            </Button>
            <Button onClick={handleUploadClick}>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
            <div className="relative w-full">
              <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search media..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="w-full sm:w-auto">
              <Select value={selectedTab} onValueChange={handleTabChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading file...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {filteredFiles.length === 0 ? (
            <div className="border rounded-md bg-card flex flex-col items-center justify-center p-8 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <SearchIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">No media found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery ? "Try a different search term" : "Upload media to get started"}
              </p>
              <Button onClick={handleUploadClick}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Media
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-[500px]">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="group relative border rounded-md overflow-hidden"
                      onClick={() => handleViewDetails(file)}
                    >
                      <div className="aspect-square relative bg-muted">
                        {file.type === "image" ? (
                          <img
                            src={file.url || "/placeholder.svg"}
                            alt={file.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">{getFileIcon(file.type)}</div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Button variant="secondary" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate" title={file.name}>
                            {file.name}
                          </p>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleViewDetails(file)
                                }}
                              >
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toast({
                                    description: "File would download in a real implementation",
                                  })
                                }}
                              >
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedFile(file)
                                  setDeleteDialogOpen(true)
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-xs text-muted-foreground">{file.size}</p>
                        {file.tags.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {file.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-[10px]">
                                {tag}
                              </Badge>
                            ))}
                            {file.tags.length > 2 && (
                              <Badge variant="secondary" className="text-[10px]">
                                +{file.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border rounded-md divide-y">
                  <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-muted/50 font-medium text-sm">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Size</div>
                    <div className="col-span-2">Date Added</div>
                    <div className="col-span-1"></div>
                  </div>
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleViewDetails(file)}
                    >
                      <div className="col-span-5 flex items-center gap-3 min-w-0">
                        {getFileIcon(file.type)}
                        <span className="truncate">{file.name}</span>
                      </div>
                      <div className="col-span-2 capitalize">{file.type}</div>
                      <div className="col-span-2">{file.size}</div>
                      <div className="col-span-2 text-sm text-muted-foreground">{formatDate(file.createdAt)}</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewDetails(file)
                              }}
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                toast({
                                  description: "File would download in a real implementation",
                                })
                              }}
                            >
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedFile(file)
                                setDeleteDialogOpen(true)
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="text-sm text-muted-foreground">
          {filteredFiles.length} {filteredFiles.length === 1 ? "file" : "files"}
        </div>
        <div className="text-sm">
          {mediaFiles
            .reduce((acc, file) => {
              const size = Number.parseFloat(file.size) || 0
              return acc + size
            }, 0)
            .toFixed(2)}{" "}
          MB used
        </div>
      </CardFooter>

      {/* File details dialog */}
      {selectedFile && (
        <Dialog open={fileDetailsOpen} onOpenChange={setFileDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>File Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center justify-center bg-muted rounded-md p-4">
                {selectedFile.type === "image" ? (
                  <img
                    src={selectedFile.url || "/placeholder.svg"}
                    alt={selectedFile.name}
                    className="max-h-[300px] object-contain"
                  />
                ) : (
                  <div className="h-[200px] w-full flex items-center justify-center">
                    {getFileIcon(selectedFile.type)}
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">File Information</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{selectedFile.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium capitalize">{selectedFile.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium">{selectedFile.size}</span>
                    </div>
                    {selectedFile.dimensions && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dimensions:</span>
                        <span className="font-medium">{selectedFile.dimensions}</span>
                      </div>
                    )}
                    {selectedFile.duration && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{selectedFile.duration}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date Added:</span>
                      <span className="font-medium">{formatDate(selectedFile.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Tags</h3>
                    <Button variant="ghost" size="sm" onClick={handleEditTags}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedFile.tags.length > 0 ? (
                      selectedFile.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No tags added</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setFileDetailsOpen(false)}>
                Close
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      description: "File would download in a real implementation",
                    })
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setFileDetailsOpen(false)
                    setDeleteDialogOpen(true)
                  }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit tags dialog */}
      {selectedFile && (
        <Dialog open={editTagsOpen} onOpenChange={setEditTagsOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Tags</DialogTitle>
              <DialogDescription>Add or remove tags for {selectedFile.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add new tag..."
                  value={newTagValue}
                  onChange={(e) => setNewTagValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddTag()
                    }
                  }}
                />
                <Button onClick={handleAddTag} disabled={!newTagValue}>
                  <Tag className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>

              <div>
                <Label>Current Tags</Label>
                <div className="mt-2 border rounded-md min-h-[100px] p-4">
                  {selectedFile.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedFile.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="pl-2 flex items-center gap-1">
                          {tag}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            <Trash className="h-3 w-3 hover:text-destructive" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No tags added yet</p>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setEditTagsOpen(false)
                  setFileDetailsOpen(true)
                }}
              >
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete file"
        description={`Are you sure you want to delete ${selectedFile?.name}? This action cannot be undone.`}
        onConfirm={handleDeleteFile}
      />
    </Card>
  )
}

