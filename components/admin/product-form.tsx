import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { extendedInsertProductSchema, Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

type ProductFormProps = {
  initialData?: Product;
  onSuccess?: () => void;
};

export function ProductForm({ initialData, onSuccess }: ProductFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [features, setFeatures] = useState<string[]>(initialData?.features || []);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [newFeature, setNewFeature] = useState("");
  const [newImage, setNewImage] = useState("");

  const formSchema = extendedInsertProductSchema.extend({
    features: z.array(z.string()).min(1, "At least one feature is required"),
    images: z.array(z.string().url("Must be a valid URL")).min(1, "At least one image URL is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          createdBy: initialData.createdBy,
        }
      : {
          name: "",
          description: "",
          price: 0,
          type: "map",
          features: [],
          images: [],
          createdBy: user?.id,
        },
  });

  const isEditing = !!initialData;

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await apiRequest(
        isEditing ? "PUT" : "POST",
        isEditing ? `/api/products/${initialData.id}` : "/api/products",
        data
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: isEditing ? "Product updated" : "Product created",
        description: isEditing
          ? "The product has been updated successfully."
          : "The product has been created successfully.",
      });
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast({
        title: isEditing ? "Failed to update product" : "Failed to create product",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function addFeature() {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
      form.setValue("features", [...features, newFeature.trim()], {
        shouldValidate: true,
      });
    }
  }

  function removeFeature(index: number) {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
    form.setValue("features", newFeatures, { shouldValidate: true });
  }

  function addImage() {
    if (newImage.trim()) {
      setImages([...images, newImage.trim()]);
      setNewImage("");
      form.setValue("images", [...images, newImage.trim()], {
        shouldValidate: true,
      });
    }
  }

  function removeImage(index: number) {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    form.setValue("images", newImages, { shouldValidate: true });
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    data.features = features;
    data.images = images;
    data.createdBy = user?.id as number;
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (USD)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="19.99"
                    {...field}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="map">Map</SelectItem>
                    <SelectItem value="script">Script</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormItem>
          <FormLabel>Features</FormLabel>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Enter a feature"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addFeature}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {features.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No features added yet.
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center bg-card rounded-md px-3 py-1 text-sm"
                >
                  <span className="mr-2">{feature}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => removeFeature(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            {form.formState.errors.features && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.features.message}
              </p>
            )}
          </div>
        </FormItem>

        <FormItem>
          <FormLabel>Image URLs</FormLabel>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="Enter an image URL"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addImage}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {images.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No images added yet.
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex items-start bg-card rounded-md p-2 text-sm"
                >
                  <div className="flex-1 break-all mr-2">{image}</div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 flex-shrink-0"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            {form.formState.errors.images && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.images.message}
              </p>
            )}
          </div>
        </FormItem>

        <div className="flex justify-end">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isEditing ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
