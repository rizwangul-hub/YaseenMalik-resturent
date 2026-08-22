import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Check, Loader2, Link as LinkIcon } from 'lucide-react';
import uploadService from '../services/uploadService';

interface ImageUploaderProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label = 'Deal / Platter Image',
  value,
  onChange,
  folder = 'yaseen_malak_deals',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [inputUrl, setInputUrl] = useState(value);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setStatusMessage('Uploading image to Cloudinary...');

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        try {
          const res = await uploadService.uploadImage(base64Image, folder);
          if (res && res.success && res.data?.url) {
            const uploadedUrl = res.data.url;
            setInputUrl(uploadedUrl);
            onChange(uploadedUrl);
            setStatusMessage('✓ Saved to Cloudinary');
          } else {
            setInputUrl(base64Image);
            onChange(base64Image);
            setStatusMessage('✓ Image attached');
          }
        } catch (err: any) {
          console.warn('[ImageUploader] Upload notice, using image data');
          setInputUrl(base64Image);
          onChange(base64Image);
          setStatusMessage('✓ Image attached');
        } finally {
          setIsUploading(false);
        }
      };
    } catch (err) {
      setIsUploading(false);
      setStatusMessage('Failed to process image');
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setInputUrl(url);
    onChange(url);
    setStatusMessage(null);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
        {label}
      </label>

      {/* Image Preview & Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Preview Thumbnail */}
        <div className="sm:col-span-4 h-24 rounded-xl bg-[#0D0E12] border border-white/10 overflow-hidden flex items-center justify-center relative group shadow-md">
          {value || inputUrl ? (
            <img
              src={value || inputUrl}
              alt="Deal Preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="text-center p-2 text-gray-500">
              <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-50" />
              <span className="text-[10px]">No image selected</span>
            </div>
          )}
        </div>

        {/* Upload Controls */}
        <div className="sm:col-span-8 space-y-2">
          {/* File input button */}
          <div className="flex items-center gap-2">
            <label className="flex-1 cursor-pointer py-2.5 px-3 bg-[#181820] hover:bg-[#22222D] border border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-xl text-xs font-semibold text-[#E5C058] flex items-center justify-center space-x-2 transition-colors">
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                  <span>Uploading Cloudinary...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload to Cloudinary</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>

          {/* URL Input */}
          <div className="relative">
            <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={inputUrl}
              onChange={handleUrlChange}
              placeholder="Or paste Cloudinary / Image URL..."
              className="w-full pl-8 pr-3 py-2 bg-[#0B0B0E] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {statusMessage && (
            <p className="text-[11px] text-emerald-400 font-medium">{statusMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};
