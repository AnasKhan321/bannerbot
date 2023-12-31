import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
export async function POST(request) {
  
    const data = await request.formData()
    const file = data.get('file')
    console.log(file)
    if (!file) {
        return NextResponse.json({ success: false })
      }

      const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = `C://WorkingOn//my-apptest//public//${file.name}`
  await writeFile(path, buffer)
  console.log(`open ${path} to see the uploaded file`)
   
  return NextResponse.json({ file : file.name })
}