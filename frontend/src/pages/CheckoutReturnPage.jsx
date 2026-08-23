import { Link, useSearchParams } from "react-router";
import { useCart } from "../store/cart";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { CheckCircle2Icon, PackageIcon } from "lucide-react";


function CheckoutReturnPage() {

  const clearCart = useCart((s)=>s.clear);
  const [params] = useSearchParams();

  const checkoutId = params.get("checkout_id");

  const queryClient = useQueryClient();

  useEffect(()=>{
    clearCart();
    queryClient.invalidateQueries({queryKey:["orders"]})
  },[queryClient,clearCart]);
  return (
    <div className="mx-auto max-w-lg px-6 py-16 text-center">
  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-amber-800/20 bg-amber-50">
    <CheckCircle2Icon className="size-8 text-amber-800" aria-hidden />
  </div>
    
  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-800">
    Order confirmed
  </p>

  <h1 className="mt-3 font-serif text-3xl font-semibold text-neutral-900">
    Thanks for your order
  </h1>

  <p className="mt-4 text-sm leading-relaxed text-neutral-500">
    Your order is created after payment is confirmed. Open it from your orders
    list for <strong className="text-neutral-900">support chat</strong> (it
    appears there as <strong className="text-neutral-900">paid</strong>).
    We&apos;ll send video invites in that thread when needed.
  </p>

  {checkoutId ? (
    <p className="mt-3 font-mono text-xs text-neutral-400">
      Checkout: {checkoutId}
    </p>
  ) : null}

  <Link
    to="/orders"
    className="mt-9 inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-black"
  >
    <PackageIcon className="size-4" aria-hidden />
    View orders
  </Link>
  
</div>

  )
}

export default CheckoutReturnPage