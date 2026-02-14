/**
 * Image utility functions for Cloudinary transformations
 * Includes automatic watermarking and optimization
 */

export interface ImageTransformOptions {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png' | 'auto';
    crop?: 'fill' | 'fit' | 'scale' | 'crop';
    gravity?: 'auto' | 'face' | 'center';
    watermark?: boolean;
}

/**
 * Generate Cloudinary URL with transformations
 */
export function getOptimizedImageUrl(
    imageUrl: string,
    options: ImageTransformOptions = {}
): string {
    const {
        width,
        height,
        quality = 80,
        format = 'auto',
        crop = 'fill',
        gravity = 'auto',
        watermark = true,
    } = options;

    // Check if it's a Cloudinary URL
    if (!imageUrl.includes('res.cloudinary.com')) {
        return imageUrl;
    }

    // Extract cloud name and public ID from URL
    const urlParts = imageUrl.split('/upload/');
    if (urlParts.length !== 2) {
        return imageUrl;
    }

    const [baseUrl, pathWithPublicId] = urlParts;

    // Build transformation string
    const transformations: string[] = [];

    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (quality) transformations.push(`q_${quality}`);
    if (format) transformations.push(`f_${format}`);
    if (crop) transformations.push(`c_${crop}`);
    if (gravity) transformations.push(`g_${gravity}`);

    // Add watermark overlay
    if (watermark) {
        transformations.push(
            'l_text:Arial_20_bold:LAIESLYBIRD',
            'co_rgb:FFFFFF80', // White with 50% opacity
            'g_south_east', // Position at bottom-right
            'x_10',
            'y_10'
        );
    }

    const transformString = transformations.join(',');

    return `${baseUrl}/upload/${transformString}/${pathWithPublicId}`;
}

/**
 * Get responsive image srcset for different screen sizes
 */
export function getResponsiveImageSrcSet(imageUrl: string): string {
    const sizes = [320, 640, 768, 1024, 1280, 1536];

    return sizes
        .map((size) => {
            const url = getOptimizedImageUrl(imageUrl, {
                width: size,
                format: 'webp',
            });
            return `${url} ${size}w`;
        })
        .join(', ');
}

/**
 * Upload preset configuration for Cloudinary
 */
export const CLOUDINARY_UPLOAD_PRESET = {
    watermark: {
        transformation: [
            {
                overlay: {
                    font_family: 'Arial',
                    font_size: 20,
                    font_weight: 'bold',
                    text: 'LAIESLYBIRD',
                },
                color: '#FFFFFF',
                opacity: 50,
                gravity: 'south_east',
                x: 10,
                y: 10,
            },
        ],
    },
};
