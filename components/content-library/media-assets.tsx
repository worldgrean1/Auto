"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { MediaAsset } from "@/lib/types"
import { getMediaAssets } from "@/lib/content"
import { FileAudio, FileImage, FileVideo, Plus, Search, Trash } from "lucide-react"

export function MediaAssets() {
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const data = await getMediaAssets()
        setAssets(data)
      } catch (error) {
        console.error("Error fetching media assets:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAssets()
  }, [])

  const filteredAssets = assets.filter((asset) => asset.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getAssetsByType = (type: string) => {
    return filteredAssets.filter((asset) => asset.type === type)
  }

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "image":
        return <FileImage className="h-12 w-12 text-muted-foreground" />
      case "video":
        return <FileVideo className="h-12 w-12 text-muted-foreground" />
      case "audio":
        return <FileAudio className="h-12 w-12 text-muted-foreground" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search media assets..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setUploadModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <MediaGrid assets={filteredAssets} loading={loading} getAssetIcon={getAssetIcon} />
        </TabsContent>

        <TabsContent value="images" className="mt-4">
          <MediaGrid assets={getAssetsByType("image")} loading={loading} getAssetIcon={getAssetIcon} />
        </TabsContent>

        <TabsContent value="videos" className="mt-4">
          <MediaGrid assets={getAssetsByType("video")} loading={loading} getAssetIcon={getAssetIcon} />
        </TabsContent>

        <TabsContent value="audio" className="mt-4">
          <MediaGrid assets={getAssetsByType("audio")} loading={loading} getAssetIcon={getAssetIcon} />
        </TabsContent>
      </Tabs>

      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Upload Media</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file">Select File</Label>
                  <Input id="file" type="file" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter a name for this media" className="mt-1" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setUploadModalOpen(false)}>
                Cancel
              </Button>
              <Button>Upload</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

interface MediaGridProps {
  assets: MediaAsset[]
  loading: boolean
  getAssetIcon: (type: string) => JSX.Element | null
}

function MediaGrid({ assets, loading, getAssetIcon }: MediaGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-square bg-muted flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-muted-foreground/20"></div>
            </div>
            <CardFooter className="p-2">
              <div className="h-4 w-full bg-muted rounded"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (assets.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 text-center">
        <CardTitle className="text-xl mb-2">No media assets found</CardTitle>
        <p className="text-muted-foreground">Upload media assets to see them here.</p>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {assets.map((asset) => (
        <Card key={asset.id} className="overflow-hidden">
          <div className="aspect-square bg-muted flex items-center justify-center relative group">
            {asset.type === "image" ? (
              <img src={asset.url || "/placeholder.svg"} alt={asset.name} className="w-full h-full object-cover" />
            ) : (
              getAssetIcon(asset.type)
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button variant="destructive" size="icon" className="h-8 w-8">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardFooter className="p-2">
            <p className="text-sm truncate w-full">{asset.name}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

