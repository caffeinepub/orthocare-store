import type { Product } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { ImageIcon, PackagePlus, Pencil, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  "Knee Support",
  "Back Support Belts",
  "Cervical Collars",
  "Arm Slings",
  "Wrist & Ankle Braces",
  "Orthopedic Cushions",
];

const EMPTY_FORM = {
  name: "",
  category: "",
  price: "",
  description: "",
  imageUrl: "",
  doctorRecommended: false,
};

type FormShape = typeof EMPTY_FORM;

export function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [form, setForm] = useState<FormShape>(EMPTY_FORM);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<FormShape>(EMPTY_FORM);
  const [editImagePreview, setEditImagePreview] = useState<string>("");
  const editFileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setImagePreview(dataUrl);
      setForm((prev) => ({ ...prev, imageUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  }

  function handleEditImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setEditImagePreview(dataUrl);
      setEditForm((prev) => ({ ...prev, imageUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  }

  function handleDelete(id: bigint) {
    if (!window.confirm("Delete this product?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted");
  }

  function handleEditOpen(product: Product) {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      description: product.description,
      imageUrl: product.imageUrl,
      doctorRecommended: product.doctorRecommended,
    });
    setEditImagePreview(product.imageUrl);
  }

  function handleEditSave() {
    if (!editForm.name || !editForm.category || !editForm.price) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!editingProduct) return;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: editForm.name,
              category: editForm.category,
              price: Number(editForm.price),
              description: editForm.description,
              imageUrl: editForm.imageUrl,
              doctorRecommended: editForm.doctorRecommended,
            }
          : p,
      ),
    );
    setEditingProduct(null);
    toast.success("Product updated!");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.category || !form.price) {
      toast.error("Please fill in all required fields");
      return;
    }
    const newProduct: Product = {
      id: BigInt(Date.now()),
      name: form.name,
      category: form.category,
      description: form.description,
      price: Number(form.price),
      rating: 0,
      reviewCount: 0n,
      inStock: true,
      doctorRecommended: form.doctorRecommended,
      imageUrl: form.imageUrl,
    };
    setProducts((prev) => [newProduct, ...prev]);
    setForm(EMPTY_FORM);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.success("Product added successfully!");
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-admin-navy font-display">
          Product Management
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {products.length} product{products.length !== 1 ? "s" : ""} in catalog
        </p>
      </div>

      {/* Product Grid */}
      <section aria-label="Product list">
        {products.length === 0 ? (
          <div
            data-ocid="products.empty_state"
            className="flex flex-col items-center justify-center py-16 text-muted-foreground"
          >
            <PackagePlus className="w-12 h-12 mb-3 opacity-40" />
            <p className="text-sm">
              No products yet. Add your first product below.
            </p>
          </div>
        ) : (
          <div
            data-ocid="products.list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {products.map((product, idx) => (
              <Card
                key={String(product.id)}
                data-ocid={`products.item.${idx + 1}`}
                className="overflow-hidden border border-border hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="h-40 bg-muted flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-10 h-10 text-muted-foreground/40" />
                  )}
                </div>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-admin-navy text-sm leading-tight truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {product.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleEditOpen(product)}
                        data-ocid={`products.edit_button.${idx + 1}`}
                        className="text-primary hover:bg-primary/10 rounded-lg p-1.5 transition-colors"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        data-ocid={`products.delete_button.${idx + 1}`}
                        className="text-destructive hover:bg-destructive/10 rounded-lg p-1.5 transition-colors"
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className="bg-primary/10 text-primary border-primary/20 font-semibold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </Badge>
                    {product.inStock ? (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-300 bg-green-50 text-xs"
                      >
                        In Stock
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-red-500 border-red-300 bg-red-50 text-xs"
                      >
                        Out of Stock
                      </Badge>
                    )}
                    {product.doctorRecommended && (
                      <Badge
                        variant="outline"
                        className="text-blue-600 border-blue-300 bg-blue-50 text-xs"
                      >
                        Dr. Recommended
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Edit Product Dialog */}
      <Dialog
        open={!!editingProduct}
        onOpenChange={(open) => !open && setEditingProduct(null)}
      >
        <DialogContent
          data-ocid="products.dialog"
          className="max-w-lg w-full max-h-[90vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="text-admin-navy font-display">
              Edit Product
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Product Name */}
              <div className="space-y-1.5">
                <Label htmlFor="edit-name">Product Name *</Label>
                <Input
                  id="edit-name"
                  data-ocid="products.input"
                  placeholder="Product name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <Label>Category *</Label>
                <Select
                  value={editForm.category}
                  onValueChange={(val) =>
                    setEditForm((prev) => ({ ...prev, category: val }))
                  }
                >
                  <SelectTrigger data-ocid="products.select">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <Label htmlFor="edit-price">Price (₹) *</Label>
                <Input
                  id="edit-price"
                  type="number"
                  min="0"
                  data-ocid="products.input"
                  placeholder="e.g. 599"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, price: e.target.value }))
                  }
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-1.5">
                <Label htmlFor="edit-image">Product Image</Label>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="edit-image"
                    data-ocid="products.upload_button"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm text-muted-foreground"
                  >
                    <ImageIcon className="w-4 h-4" />
                    {editImagePreview ? "Change" : "Upload"}
                    <input
                      ref={editFileInputRef}
                      id="edit-image"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleEditImageChange}
                    />
                  </label>
                  {editImagePreview && (
                    <img
                      src={editImagePreview}
                      alt="Preview"
                      className="w-12 h-12 rounded-lg object-cover border border-border flex-shrink-0"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-desc">Description</Label>
              <Textarea
                id="edit-desc"
                data-ocid="products.textarea"
                placeholder="Describe the product..."
                rows={3}
                value={editForm.description}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            {/* Doctor Recommended */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="edit-doctor"
                data-ocid="products.checkbox"
                checked={editForm.doctorRecommended}
                onCheckedChange={(checked) =>
                  setEditForm((prev) => ({
                    ...prev,
                    doctorRecommended: checked === true,
                  }))
                }
              />
              <Label htmlFor="edit-doctor" className="cursor-pointer">
                Doctor Recommended
              </Label>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              data-ocid="products.cancel_button"
              onClick={() => setEditingProduct(null)}
            >
              Cancel
            </Button>
            <Button
              data-ocid="products.save_button"
              onClick={handleEditSave}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Product Form */}
      <Card className="border border-border shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-admin-navy font-display mb-5 flex items-center gap-2">
            <PackagePlus className="w-5 h-5 text-primary" />
            Add New Product
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="products.modal"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Product Name */}
              <div className="space-y-1.5">
                <Label htmlFor="prod-name">Product Name *</Label>
                <Input
                  id="prod-name"
                  data-ocid="products.input"
                  placeholder="e.g. ProFlex Knee Support Cap"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <Label htmlFor="prod-category">Category *</Label>
                <Select
                  value={form.category}
                  onValueChange={(val) =>
                    setForm((prev) => ({ ...prev, category: val }))
                  }
                >
                  <SelectTrigger data-ocid="products.select" id="prod-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <Label htmlFor="prod-price">Price (₹) *</Label>
                <Input
                  id="prod-price"
                  type="number"
                  min="0"
                  data-ocid="products.input"
                  placeholder="e.g. 599"
                  value={form.price}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, price: e.target.value }))
                  }
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-1.5">
                <Label htmlFor="prod-image">Product Image</Label>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="prod-image"
                    data-ocid="products.upload_button"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm text-muted-foreground"
                  >
                    <ImageIcon className="w-4 h-4" />
                    {imagePreview ? "Change Image" : "Upload Image"}
                    <input
                      ref={fileInputRef}
                      id="prod-image"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-12 h-12 rounded-lg object-cover border border-border flex-shrink-0"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="prod-desc">Description</Label>
              <Textarea
                id="prod-desc"
                data-ocid="products.textarea"
                placeholder="Describe the product, materials, use cases..."
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>

            {/* Doctor Recommended */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="prod-doctor"
                data-ocid="products.checkbox"
                checked={form.doctorRecommended}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({
                    ...prev,
                    doctorRecommended: checked === true,
                  }))
                }
              />
              <Label htmlFor="prod-doctor" className="cursor-pointer">
                Doctor Recommended
              </Label>
            </div>

            <Button
              type="submit"
              data-ocid="products.submit_button"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
            >
              <PackagePlus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
