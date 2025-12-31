<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageController extends Controller
{
    /**
     * Upload image for programs - Simple version without complex processing
     */
    public function upload(Request $request): JsonResponse
    {
        // EXTENSIVE DEBUG LOGGING
        \Log::info('=== NEW SIMPLE IMAGE CONTROLLER CALLED ===');
        \Log::info('Request method: ' . $request->method());
        \Log::info('Request URL: ' . $request->fullUrl());
        \Log::info('Content Length: ' . $request->header('Content-Length'));
        \Log::info('PHP upload_max_filesize: ' . ini_get('upload_max_filesize'));
        \Log::info('PHP post_max_size: ' . ini_get('post_max_size'));
        \Log::info('Request files: ', $request->allFiles());
        \Log::info('Request all data: ', $request->all());
        \Log::info('Has image file: ' . ($request->hasFile('image') ? 'YES' : 'NO'));
        
        // Check if file was uploaded but failed due to size
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            \Log::info('File details: Size=' . $file->getSize() . ', Error=' . $file->getError());
        } else {
            \Log::info('No file received - likely exceeded PHP upload limits');
        }
        
        // Check if no file was received (likely due to PHP limits)
        if (!$request->hasFile('image')) {
            $contentLength = $request->header('Content-Length');
            $maxUpload = ini_get('upload_max_filesize');
            $maxPost = ini_get('post_max_size');
            
            return response()->json([
                'success' => false,
                'message' => 'File upload failed. Your file might be too large.',
                'errors' => [
                    'image' => [
                        "File upload failed. Your file appears to be " . 
                        number_format($contentLength / 1024 / 1024, 1) . "MB. Files are automatically compressed on the frontend."
                    ]
                ],
                'debug' => [
                    'content_length' => $contentLength,
                    'php_upload_max' => $maxUpload,
                    'php_post_max' => $maxPost
                ]
            ], 422);
        }

        // Basic validation
        try {
            \Log::info('Starting validation...');
            $request->validate([
                'image' => 'required|file|mimes:jpeg,png,jpg,gif,webp,svg|max:2048', // 2MB max (frontend compresses)
                'type' => 'nullable|string|in:program,workshop,general,organization',
            ]);
            \Log::info('Validation passed!');
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation failed: ', $e->errors());
            return response()->json([
                'success' => false,
                'message' => 'File validation failed.',
                'errors' => $e->errors(),
                'debug' => 'NEW SIMPLE CONTROLLER - Validation Error'
            ], 422);
        }

        try {
            $uploadedFile = $request->file('image');
            $type = $request->input('type', 'general');
            
            // Generate unique filename keeping original extension
            $originalExtension = $uploadedFile->getClientOriginalExtension();
            $filename = $type . '_' . time() . '_' . Str::random(10) . '.' . $originalExtension;
            
            // Special processing for organization logos
            if ($type === 'organization') {
                $path = $this->processOrganizationLogo($uploadedFile, $filename);
            } else {
                // Store the file directly without processing for other types
                $path = $uploadedFile->storeAs('images', $filename, 'public');
            }
            
            // Get file info
            $size = $uploadedFile->getSize();
            $mimeType = $uploadedFile->getMimeType();
            
            // Generate the full URL
            $url = Storage::url($path);
            $fullUrl = request()->getSchemeAndHttpHost() . $url;
            
            \Log::info('Generated URL: ' . $url);
            \Log::info('Full URL: ' . $fullUrl);
            \Log::info('Storage path: ' . $path);
            
            return response()->json([
                'success' => true,
                'data' => [
                    'url' => $fullUrl,  // Return full URL instead of relative
                    'relative_url' => $url,
                    'path' => $path,
                    'filename' => $filename,
                    'size' => $size,
                    'mime_type' => $mimeType,
                    'original_name' => $uploadedFile->getClientOriginalName(),
                ],
                'message' => 'Image uploaded successfully.',
            ]);
            
        } catch (\Exception $e) {
            \Log::error('=== NEW SIMPLE CONTROLLER ERROR ===');
            \Log::error('Exception: ' . $e->getMessage());
            \Log::error('File: ' . $e->getFile());
            \Log::error('Line: ' . $e->getLine());
            \Log::error('Trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'success' => false,
                'message' => 'NEW CONTROLLER: Failed to upload image.',
                'error' => $e->getMessage(),
                'debug' => 'NEW SIMPLE CONTROLLER - Exception caught',
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], 500);
        }
    }

    /**
     * Test method to verify controller is working
     */
    public function test(): JsonResponse
    {
        \Log::info('=== IMAGE CONTROLLER TEST METHOD CALLED ===');
        
        return response()->json([
            'success' => true,
            'message' => 'NEW ImageController is working!',
            'timestamp' => now(),
            'php_settings' => [
                'upload_max_filesize' => ini_get('upload_max_filesize'),
                'post_max_size' => ini_get('post_max_size'),
                'max_execution_time' => ini_get('max_execution_time'),
            ],
            'debug' => 'Test method called successfully'
        ]);
    }

    /**
     * Delete uploaded image
     */
    public function delete(Request $request): JsonResponse
    {
        $request->validate([
            'path' => 'required|string',
        ]);

        try {
            $path = $request->input('path');
            
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
                
                return response()->json([
                    'success' => true,
                    'message' => 'Image deleted successfully.',
                ]);
            }
            
            return response()->json([
                'success' => false,
                'message' => 'Image not found.',
            ], 404);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete image: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Process organization logo with automatic resizing and optimization
     */
    private function processOrganizationLogo($uploadedFile, $filename): string
    {
        // For now, just store the original file
        // Later we can add image processing libraries like Intervention Image
        // to resize and optimize organization logos to a standard size (64x64px)
        $path = $uploadedFile->storeAs('images', $filename, 'public');
        
        \Log::info('Organization logo uploaded: ' . $path);
        
        return $path;
    }
}
