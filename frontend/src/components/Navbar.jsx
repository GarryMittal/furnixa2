// import { Show, SignInButton, useAuth, UserButton } from "@clerk/react";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import {
//   LogInIcon,
//   PackageIcon,
//   RockingChairIcon,
//   SettingsIcon,
//   ShoppingBagIcon,
//   ShoppingCartIcon,

// } from "lucide-react";

// import { apiFetch } from "../lib/api";
// import { useCart } from "../store/cart";

// const Navbar = () => {
//   const { getToken, isSignedIn } = useAuth();

//   const { data: meData } = useQuery({
//     queryKey: ["me"],
//     queryFn: () => apiFetch("/api/me", { getToken }),
//     enabled: isSignedIn,
//   });

//   const role = meData?.user?.role;

//   const cartCount = useCart((s) =>
//     s.items.reduce((n, line) => n + line.quantity, 0),
//   );

//   return (
//     <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#F8F5F0]/95 backdrop-blur-xl">
//       <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
//         {/* Logo */}
//         <RockingChairIcon />
//         <Link
//           to="/"
//           className="text-3xl font-bold uppercase tracking-[0.3em] text-neutral-900 transition hover:text-neutral-600"
//         >
          
//           Furnixa
//         </Link>

//         {/* Navigation */}
//         <nav className="flex items-center gap-8">
//           <Link
//             to="/shop"
//             className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-neutral-700 transition hover:text-black"
//           >
//             <ShoppingBagIcon size={18} />
//             <span className="hidden md:inline">Shop</span>
//           </Link>

//           <Show when="signed-in">
//             <Link
//               to="/orders"
//               className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-neutral-700 transition hover:text-black"
//             >
//               <PackageIcon size={18} />
//               <span className="hidden md:inline">Orders</span>
//             </Link>

//             {role === "admin" && (
//               <Link
//                 to="/admin"
//                 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-neutral-700 transition hover:text-black"
//               >
//                 <SettingsIcon size={18} />
//                 <span className="hidden md:inline">Admin</span>
//               </Link>
//             )}
//           </Show>

//           {/* Cart */}

//           <Link
//             to="/cart"
//             className="relative flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-neutral-700 transition hover:text-black"
//           >
//             <ShoppingCartIcon size={20} />

//             {cartCount > 0 && (
//               <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
//                 {cartCount > 99 ? "99+" : cartCount}
//               </span>
//             )}

//             <span className="hidden md:inline">Cart</span>
//           </Link>

//           {/* Sign In */}

//           <Show when="signed-out">
//             <SignInButton mode="modal">
//               <button
//                 type="button"
//                 className="cursor-pointer rounded-full border border-black px-5 py-2 text-sm font-medium transition-all duration-300 hover:bg-black hover:text-white"
//               >
//                 <span className="flex items-center gap-2">
//                   <LogInIcon size={16} />
//                   Sign In
//                 </span>
//               </button>
//             </SignInButton>
//           </Show>

//           {/* User */}

//           <Show when="signed-in">
//             <div className="flex items-center gap-4 border-l border-neutral-300 pl-6">
//               <UserButton
//                 appearance={{
//                   elements: {
//                     avatarBox: "h-10 w-10 border border-neutral-300 shadow-sm",
//                   },
//                 }}
//               />

//               {(role === "admin" || role === "support") && (
//                 <span className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium uppercase tracking-widest text-neutral-700">
//                   {role}
//                 </span>
//               )}
//             </div>
//           </Show>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import { Show, SignInButton, useAuth, UserButton } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  LogInIcon,
  PackageIcon,
  RockingChairIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "lucide-react";

import { apiFetch } from "../lib/api";
import { useCart } from "../store/cart";

const Navbar = () => {
  const { getToken, isSignedIn } = useAuth();

  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => apiFetch("/api/me", { getToken }),
    enabled: isSignedIn,
  });

  const role = meData?.user?.role;

  const cartCount = useCart((s) =>
    s.items.reduce((n, line) => n + line.quantity, 0),
  );

  
  //F5F2E9
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#E9EFEC]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:h-20 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 text-neutral-900 transition hover:text-neutral-600"
        >
          <RockingChairIcon
            className="size-6 text-[#5C6B4F] sm:size-7"
            strokeWidth={1.75}
            aria-hidden
          />
          <span className="text-lg font-bold uppercase tracking-[0.1em] sm:text-2xl sm:tracking-[0.2em] lg:text-3xl lg:tracking-[0.3em]">
            Furnixa
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1.5 sm:gap-4 md:gap-6 lg:gap-8">
          <Link
            to="/shop"
            className="flex items-center gap-2 rounded-lg p-2 text-sm font-medium uppercase tracking-wider text-neutral-700 transition hover:bg-black/5 hover:text-black sm:p-0 sm:hover:bg-transparent"
          >
            <ShoppingBagIcon size={18} />
            <span className="hidden md:inline">Shop</span>
          </Link>

          <Show when="signed-in">
            <Link
              to="/orders"
              className="flex items-center gap-2 rounded-lg p-2 text-sm font-medium uppercase tracking-wider text-neutral-700 transition hover:bg-black/5 hover:text-black sm:p-0 sm:hover:bg-transparent"
            >
              <PackageIcon size={18} />
              <span className="hidden md:inline">Orders</span>
            </Link>

            {role === "admin" && (
              <Link
                to="/admin"
                className="flex items-center gap-2 rounded-lg p-2 text-sm font-medium uppercase tracking-wider text-neutral-700 transition hover:bg-black/5 hover:text-black sm:p-0 sm:hover:bg-transparent"
              >
                <SettingsIcon size={18} />
                <span className="hidden md:inline">Admin</span>
              </Link>
            )}
          </Show>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 rounded-lg p-2 text-sm font-medium uppercase tracking-wider text-neutral-700 transition hover:bg-black/5 hover:text-black sm:p-0 sm:hover:bg-transparent"
          >
            <ShoppingCartIcon size={20} />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-semibold text-white sm:-right-3 sm:-top-3 sm:h-5 sm:w-5 sm:text-[10px]">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}

            <span className="hidden md:inline">Cart</span>
          </Link>

          {/* Sign In */}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                type="button"
                className="cursor-pointer rounded-full border border-black px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:bg-black hover:text-white sm:px-5 sm:py-2 sm:text-sm"
              >
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <LogInIcon size={16} />
                  <span className="hidden xs:inline">Sign In</span>
                </span>
              </button>
            </SignInButton>
          </Show>

          {/* User */}
          <Show when="signed-in">
            <div className="flex items-center gap-2 border-l border-neutral-300 pl-2 sm:gap-4 sm:pl-6">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "h-8 w-8 border border-neutral-300 shadow-sm sm:h-10 sm:w-10",
                  },
                }}
              />

              {(role === "admin" || role === "support") && (
                <span className="hidden rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium uppercase tracking-widest text-neutral-700 sm:inline-block">
                  {role}
                </span>
              )}
            </div>
          </Show>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;