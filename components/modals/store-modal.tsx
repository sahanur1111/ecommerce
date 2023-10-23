"use client";
import * as z from "zod";
import axios from "axios";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

import {
     Form, 
     FormField, 
     FormItem, 
     FormLabel, 
     FormControl, 
     FormMessage
    } from "@/components/ui/form";
import {Input} from "@/components/ui/input"
import { Button } from "@/components/ui/button";


const formSchema = z.object({

    name: z.string().min(1),

});

export const StoreModal = () => {
    const storeModel = useStoreModal;

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
         
        try{
        
            setLoading(true);

            // throw new Error("x");
            
            const response = await axios.post('/api/stores', values);

            toast.success("Store created.");

        }catch (error){
            toast.error("Something went wrong.");
        }finally{
            setLoading(false);
        }
    }

    return(
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen = {StoreModal}
      onClose = {StoreModal}
    >
      <div>
      <div className="space-y-4 py-2 pb-4">
        <Form {... form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                control = {form.control}
                name = "name"
                render={({ field }) => (

                 <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input
                     disabled = {loading} 
                     placeholder="E-Commerce" 
                     {...field} />
                </FormControl>
                <FormMessage/>
                 </FormItem>

                )}

                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full ">          
                <Button 
                disabled={loading}
                variant="outline" 
                onClick={StoreModal}>
                    Cancel
                    </Button>
                <Button disabled={loading} 
                type="submit">Continue</Button>
                </div>
                    
            </form>

        </Form>
        </div>
      </div>
    </Modal>
    );
};