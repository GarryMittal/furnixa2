import { Navigate } from "react-router";
import { useAdminProductsPage } from "../hooks/useAdminProductsPage.jsx";
import { AdminProductsTableSkeleton } from "../components/LoadingSkeletons.jsx";
import { IK_PRESETS, imageKitOptimizedUrl } from "../lib/imagekitUrl.js";
import { PackageIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { formatPrice } from "../utils/format.js";
import { AdminProductForm } from "../components/AdminProductForm.jsx";

function AdminProductsPage() {
  const {
    getToken,
    meData,
    modalOpen,
    setModalOpen,
    editing,
    setEditing,
    products,
    isLoading,
    saveMutation,
    deleteMutation,
  } = useAdminProductsPage();

  if (meData && meData.user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  function handleDeleteProduct(product) {
    if (!window.confirm(`Delete "${product.name}" permanently?`)) return;

    deleteMutation.mutate(product.id);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 text-left sm:px-10 lg:px-16">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <PackageIcon className="size-8 text-amber-800" aria-hidden />
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Products</h1>
            <p className="text-sm text-neutral-500">
              Manage catalog (admin only).
            </p>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
        >
          <PlusIcon className="size-4" aria-hidden />
          Add product
        </button>
      </div>

      {isLoading ? (
        <AdminProductsTableSkeleton />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                <th className="w-24 px-4 py-3 font-medium">Preview</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Active</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>

            <tbody>
              {products.map((p, i) => (
                <tr
                  key={p.id}
                  className={`border-b border-neutral-100 last:border-0 ${
                    i % 2 === 1 ? "bg-neutral-50/50" : ""
                  }`}
                >
                  <td className="px-4 py-3 align-middle">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 sm:h-18 sm:w-18">
                      {p.images && p.images.length > 0 ? (
                        <img
                          src={imageKitOptimizedUrl(
                            (
                              p.images.find((img) => img.isPrimary) ??
                              p.images[0]
                            ).imageUrl,
                            IK_PRESETS.adminThumb,
                          )}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
                          <PackageIcon
                            className="size-6 text-neutral-300"
                            aria-hidden
                          />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-neutral-900">
                    {p.name}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                      {p.category ?? "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-neutral-500">
                    {p.slug}
                  </td>
                  <td className="px-4 py-3 text-neutral-900">
                    {formatPrice(p.priceCents, p.currency)}
                  </td>
                  <td className="px-4 py-3">
                    {p.active ? (
                      <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                        yes
                      </span>
                    ) : (
                      <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-400">
                        no
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center justify-end gap-1">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
                        onClick={() => {
                          setEditing(p);
                          setModalOpen(true);
                        }}
                      >
                        <PencilIcon className="size-3" aria-hidden />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                        disabled={
                          deleteMutation.isPending &&
                          deleteMutation.variables === p.id
                        }
                        onClick={() => handleDeleteProduct(p)}
                      >
                        {deleteMutation.isPending &&
                        deleteMutation.variables === p.id ? (
                          <span className="h-3 w-3 animate-spin rounded-full border-2 border-red-300 border-t-red-500" />
                        ) : (
                          <Trash2Icon className="size-3" aria-hidden />
                        )}
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/50 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-neutral-900">
              {editing ? "Edit product" : "New product"}
            </h3>

            <div className="mt-4">
              <AdminProductForm
                key={editing?.id ?? "new"}
                initial={editing}
                saving={saveMutation.isPending}
                error={saveMutation.isError}
                getToken={getToken}
                onCancel={closeModal}
                onSubmit={(body) =>
                  saveMutation.mutate({ body, id: editing?.id })
                }
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AdminProductsPage;
