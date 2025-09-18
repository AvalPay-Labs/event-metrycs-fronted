"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import { useOrganizations } from '@/lib/hooks/use-organization';
import { Upload, X, Building, ExternalLink, MessageSquare, Users } from 'lucide-react';
import Image from 'next/image';

const organizationRequestSchema = z.object({
    organizationName: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters'),
    website: z.string()
        .url('Must be a valid URL')
        .min(1, 'Website is required'),
    twitter: z.string()
        .optional()
        .refine((val) => !val || /^@?[a-zA-Z0-9_]+$/.test(val), {
            message: 'Invalid Twitter format'
        }),
    description: z.string()
        .min(50, 'Description must be at least 50 characters')
        .max(1000, 'Description must be less than 1000 characters'),
    reference: z.string().optional(),
    requestedRole: z.string()
    .min(2, 'Role must be at least 2 characters')
    .max(50, 'Role must be less than 50 characters')
});

type OrganizationRequestForm = z.infer<typeof organizationRequestSchema>;

interface CreateOrganizationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateOrganizationModal({ isOpen, onClose }: CreateOrganizationModalProps) {
    const [logo, setLogo] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string>('');
    
    const { createRequest, isCreatingRequest } = useOrganizations();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<OrganizationRequestForm>({
        resolver: zodResolver(organizationRequestSchema)
    });

    const handleClose = () => {
        reset();
        setLogo(null);
        setLogoPreview('');
        onClose();
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File must be less than 5MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Only image files are allowed');
                return;
            }

            setLogo(file);
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: OrganizationRequestForm) => {
        try {
            const requestData = {
                ...data,
                twitter: data.twitter ? data.twitter.replace('@', '') : undefined,
                logo: logo || undefined
            };

            await createRequest(requestData);
            handleClose();
        } catch (error) {
            console.error('Error creating organization request:', error);
        }
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={handleClose}
            title="Create new organization"
            description="Complete the form to request the creation of your organization"
            className="bg-slate-900 border-slate-800 text-white max-w-2xl"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                        Organization logo
                    </label>
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
                            {logoPreview ? (
                                <Image 
                                    src={logoPreview} 
                                    alt="Logo preview" 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Building className="w-8 h-8 text-slate-400" />
                            )}
                        </div>
                        
                        <div className="flex-1">
                            <label className="cursor-pointer">
                                <div className="flex items-center space-x-2 px-4 py-2 border border-slate-600 rounded-lg hover:border-slate-500 transition-colors bg-slate-800"> {/* Add bg-slate-800 */}
                                    <Upload className="w-4 h-4 text-slate-300" /> 
                                    <span className="text-sm text-slate-300"> 
                                        {logo ? logo.name : 'Select file'}
                                    </span>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {logo && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setLogo(null);
                                    setLogoPreview('');
                                }}
                                className="text-slate-300 hover:text-white hover:bg-slate-700"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                        Format: PNG, JPG. Maximum 5MB.
                    </p>
                </div>

                <Input
                    label="Organization name"
                    placeholder="Ej: My Company"
                    leftIcon={<Building className="w-4 h-4 text-slate-400" />}
                    error={errors.organizationName?.message}
                    {...register('organizationName')}
                />

                <Input
                    label="Website"
                    placeholder="https://mycompany.com"
                    type="url"
                    leftIcon={<ExternalLink className="w-4 h-4 text-slate-400" />}
                    error={errors.website?.message}
                    {...register('website')}
                />

                <Input
                    label="Twitter (optional)"
                    placeholder="@mycompany"
                    leftIcon={<span className="text-slate-400 text-sm">@</span>}
                    error={errors.twitter?.message}
                    {...register('twitter')}
                />

                <Input
                    label="Your role in the organization"
                    placeholder="Ej: CEO, Founder, Ambassador, etc."
                    leftIcon={<Users className="w-4 h-4 text-slate-400" />}
                    error={errors.requestedRole?.message}
                    {...register('requestedRole')}
                />

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Why do you want to use EventMetrics?
                    </label>
                    <Textarea
                        placeholder="Describe how you plan to use EventMetrics, what type of events you organize, and what objectives you have..."
                        rows={4}
                        error={errors.description?.message}
                        className="resize-none"
                        {...register('description')}
                    />
                    <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-slate-400">
                            Minimum 50 characters
                        </p>
                        <p className="text-xs text-slate-400">
                            {register('description').name ? 'characters' : '0'}/1000
                        </p>
                    </div>
                </div>

                <Input
                    label="Reference (optional)"
                    placeholder="Who recommended EventMetrics?"
                    leftIcon={<MessageSquare className="w-4 h-4 text-slate-400" />}
                    error={errors.reference?.message}
                    {...register('reference')}
                />

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-sm text-blue-300">
                        💡 <strong>Information:</strong> Your request will be reviewed by our team. 
                        You will receive a notification when it is approved or if we need more information.
                    </p>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        disabled={isCreatingRequest}
                        className="border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isCreatingRequest}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {isCreatingRequest ? (
                            <>
                                <Spinner size="sm" className="mr-2" />
                                Sending...
                            </>
                        ) : (
                            'Send request'
                        )}
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}