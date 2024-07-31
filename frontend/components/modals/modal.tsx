"use client"

import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";

interface ModalProps {
    type: 'sheet' | 'drawer' | 'dialog'
    title?: string;
    description?: string;
    currentStep?: number;
    totalSteps?: number; 
    isOpen? : boolean;
    onClose?: () => void;
    onSubmit: () => void;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel?: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    actionLabelVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export const Modal = ({
    type,
    isOpen,
    onClose,
    onSubmit,
    title,
    description,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    actionLabelVariant = 'default',
    secondaryActionLabel,
}: ModalProps) => {

    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }


    return (
        <>
        {type === 'dialog' && (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent>

                    <DialogHeader>
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>

                    <div>
                        {body}
                    </div>

                    <DialogFooter className="gap-2">
                        {secondaryActionLabel && (
                            <Button 
                                className="w-full"
                                variant={'outline'} onClick={secondaryAction}
                                disabled={disabled}
                            >
                                {secondaryActionLabel}
                            </Button>
                        )}
                        <Button 
                            className="w-full"
                            //@ts-ignore
                            variant={actionLabelVariant} 
                            onClick={onSubmit}
                            disabled={disabled}
                        >
                            {actionLabel}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )}


        {type === 'sheet' && (
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent>

                    <SheetHeader>
                        <SheetTitle>
                            {title}
                        </SheetTitle>
                        <SheetDescription>
                            {description}
                        </SheetDescription>
                    </SheetHeader>

                    <div>
                        {body}
                    </div>

                    <SheetFooter className="gap-2">
                        {secondaryActionLabel && (
                            <Button 
                                className="w-full"
                                variant={'outline'} onClick={secondaryAction}
                                disabled={disabled}
                            >
                                {secondaryActionLabel}
                            </Button>
                        )}
                        <Button 
                            className="w-full"
                            //@ts-ignore
                            variant={actionLabelVariant} 
                            onClick={onSubmit}
                            disabled={disabled}
                        >
                            {actionLabel}
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        )}


        {type === 'drawer' && (
            <Drawer open={isOpen} onOpenChange={onClose}>
                <DrawerContent>

                    <DrawerHeader>
                        <DrawerTitle>
                            {title}
                        </DrawerTitle>
                        <DrawerDescription>
                            {description}
                        </DrawerDescription>
                    </DrawerHeader>

                    <div>
                        {body}
                    </div>

                    <DrawerFooter className="gap-2">
                        {secondaryActionLabel && (
                            <Button 
                                className="w-full"
                                variant={'outline'} onClick={secondaryAction}
                                disabled={disabled}
                            >
                                {secondaryActionLabel}
                            </Button>
                        )}
                        <Button 
                            className="w-full"
                            //@ts-ignore
                            variant={actionLabelVariant} 
                            onClick={onSubmit}
                            disabled={disabled}
                        >
                            {actionLabel}
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )}
        </>
    )
}