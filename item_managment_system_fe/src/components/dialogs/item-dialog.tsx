'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ItemForm } from '@/components/forms/item-form';
import { useCreateItem, useUpdateItem } from '@/lib/hooks/use-items';
import { CreateItemData, Item } from '@/types/item';

interface ItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item?: Item; // If provided, it's edit mode; if not, it's create mode
}

export const ItemDialog = ({ isOpen, onClose, item }: ItemDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const createItemMutation = useCreateItem();
  const updateItemMutation = useUpdateItem();

  const isEditMode = !!item;

  const handleSubmit = async (data: CreateItemData) => {
    setIsSubmitting(true);
    
    try {
      if (isEditMode && item) {
        await updateItemMutation.mutateAsync({ id: item.id, data });
      } else {
        await createItemMutation.mutateAsync(data);
      }
      onClose();
    } catch (error) {
      // Error handling is done in the mutation hooks
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setIsSubmitting(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto mx-4 md:mx-0">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">
            {isEditMode ? 'Edit Item' : 'Add New Item'}
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base">
            {isEditMode 
              ? 'Update the item information below.' 
              : 'Fill in the details to create a new item.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <ItemForm
          initialData={item}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};
