import { useAuth } from "@clerk/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { apiFetch } from "../lib/api";

export function useAdminProductsPage() {
  const { getToken, isSignedIn } = useAuth();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Current logged in user
  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => apiFetch("/api/me", { getToken }),
    enabled: isSignedIn,
  });

  const isAdmin = meData?.user?.role === "admin";

  // Admin product list
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => apiFetch("/api/admin/products", { getToken }),
    enabled: isSignedIn && isAdmin,
  });

  // Create / Update product
  const saveMutation = useMutation({
    mutationFn: async ({ body, id }) => {
      if (id) {
        return apiFetch(`/api/admin/products/${id}`, {
          getToken,
          method: "PATCH",
          body,
        });
      }

      return apiFetch("/api/admin/products", {
        getToken,
        method: "POST",
        body,
      });
    },

    onSuccess: () => {
      // Admin product list
      queryClient.invalidateQueries({
        queryKey: ["admin", "products"],
      });

      // Shop page
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      // Product detail pages
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });

      // Categories
      queryClient.invalidateQueries({
        queryKey: ["product-categories"],
      });

      setModalOpen(false);
      setEditing(null);
    },
  });

  // Delete product
  const deleteMutation = useMutation({
    mutationFn: (productId) =>
      apiFetch(`/api/admin/products/${productId}`, {
        getToken,
        method: "DELETE",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["product"],
      });

      queryClient.invalidateQueries({
        queryKey: ["product-categories"],
      });
    },

    onError: (err) => {
      console.error(err);
      window.alert(err instanceof Error ? err.message : "Delete failed");
    },
  });

  return {
    getToken,
    isSignedIn,

    meData,
    isAdmin,

    modalOpen,
    setModalOpen,

    editing,
    setEditing,

    products: data?.products ?? [],
    isLoading,

    saveMutation,
    deleteMutation,
  };
}