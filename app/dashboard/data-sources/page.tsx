'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, Database, Cloud, Link2, Plus, File, AlertCircle, CheckCircle } from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface DataSource {
  id: string
  name: string
  type: 'csv' | 'api' | 'database'
  lastSync?: string
  status: 'connected' | 'error' | 'pending'
}

export default function DataSourcesPage() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: '1',
      name: 'Current Demo Data',
      type: 'database',
      lastSync: '2 hours ago',
      status: 'connected',
    },
  ])
  const [showChat, setShowChat] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      setUploadProgress(i)
    }

    const newSource: DataSource = {
      id: String(dataSources.length + 1),
      name: file.name,
      type: 'csv',
      lastSync: 'just now',
      status: 'connected',
    }

    setDataSources([...dataSources, newSource])
    setIsUploading(false)
    setUploadProgress(0)
  }

  return (
    <DashboardLayout onChatToggle={() => setShowChat(!showChat)} showChat={showChat}>
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6 max-w-6xl">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-balance">Data Sources & Connections</h1>
            <p className="text-muted-foreground mt-2">
              Connect your inventory systems or upload data to power forecasts and recommendations
            </p>
          </div>

          {/* Quick Start Alert */}
          <Alert className="border-primary/50 bg-primary/5">
            <Database className="h-4 w-4 text-primary" />
            <AlertDescription>
              We're currently using demo data to showcase the platform. Connect your real inventory systems to get accurate forecasts tailored to your business.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="sources" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="sources">Sources</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>

            {/* Connected Sources */}
            <TabsContent value="sources" className="space-y-4 mt-4">
              <div className="grid gap-4">
                {dataSources.map(source => (
                  <Card key={source.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <Database className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{source.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {source.type.toUpperCase()} • Synced {source.lastSync}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {source.status === 'connected' && (
                            <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm font-medium">Connected</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Upload CSV */}
            <TabsContent value="upload" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload CSV File
                  </CardTitle>
                  <CardDescription>
                    Import your inventory data with columns: SKU, Location, Date, Quantity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="hidden"
                      id="csv-upload"
                    />
                    <label htmlFor="csv-upload" className="cursor-pointer block">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="font-semibold">Drop your CSV here</p>
                      <p className="text-sm text-muted-foreground">or click to browse</p>
                    </label>
                    {isUploading && (
                      <div className="mt-4">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{uploadProgress}%</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 space-y-2">
                    <h4 className="font-semibold">Expected CSV Format:</h4>
                    <div className="bg-muted p-3 rounded-lg font-mono text-xs space-y-1">
                      <div>SKU,Location,Date,Quantity,Price</div>
                      <div>SKU-001,Store-01,2024-01-01,50,25.99</div>
                      <div>SKU-002,Store-02,2024-01-01,35,49.99</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* API Connection */}
            <TabsContent value="api" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="w-5 h-5" />
                    API Integrations
                  </CardTitle>
                  <CardDescription>
                    Connect to your inventory management system via API
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    {[
                      { name: 'Shopify', logo: '🛍️', desc: 'Connect your Shopify store' },
                      { name: 'WooCommerce', logo: '📦', desc: 'Sync WooCommerce inventory' },
                      { name: 'SAP', logo: '💼', desc: 'Integrate SAP ERP system' },
                      { name: 'NetSuite', logo: '📊', desc: 'Connect NetSuite inventory' },
                      { name: 'Custom API', logo: '🔌', desc: 'Build custom integration' },
                    ].map(integration => (
                      <Card key={integration.name} className="bg-muted/50">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{integration.logo}</span>
                              <div>
                                <p className="font-semibold">{integration.name}</p>
                                <p className="text-sm text-muted-foreground">{integration.desc}</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Link2 className="w-4 h-4 mr-2" />
                              Connect
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
                    <p className="text-sm">
                      <span className="font-semibold">Don't see your system?</span> Contact our team to build a custom integration.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Integration Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Sync Settings</CardTitle>
              <CardDescription>Configure how your data is synced</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Sync Frequency</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                  <option>Every hour</option>
                  <option>Every 6 hours</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Data Retention</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                  <option>Last 3 months</option>
                  <option>Last 6 months</option>
                  <option>Last 1 year</option>
                  <option>All data</option>
                </select>
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
