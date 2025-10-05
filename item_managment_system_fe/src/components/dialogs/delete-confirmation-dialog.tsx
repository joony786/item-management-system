'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  isLoading?: boolean;
}

export const DeleteConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description = 'This action cannot be undone.',
  isLoading = false,
}: DeleteConfirmationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg mx-4 md:mx-0">
        <DialogHeader className="space-y-4">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-red-100 flex-shrink-0">
              <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
            </div>
            <div className="space-y-2">
              <DialogTitle className="text-lg md:text-xl font-semibold text-gray-900">{title}</DialogTitle>
              <DialogDescription className="text-sm md:text-base text-gray-600 leading-relaxed">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 md:pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="h-10 md:h-12 px-4 md:px-6 border-gray-300 hover:bg-gray-50 text-sm md:text-base"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="h-10 md:h-12 px-4 md:px-6 bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 text-sm md:text-base"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
