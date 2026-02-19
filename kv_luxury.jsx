import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, X } from "lucide-react";

export default function KVLuxuryWebsite() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  const GST_RATE = 0.18;

  const products = [
    { id: 1, name: "Power Blazer", price: 95000 },
    { id: 2, name: "Leather Authority Jacket", price: 145000 },
    { id: 3, name: "Midnight Sovereign Dress", price: 120000 },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
    setCartOpen(true);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const gstAmount = subtotal * GST_RATE;
  const total = subtotal + gstAmount;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: "KV" + (orders.length + 1).toString().padStart(4, "0"),
      items: cart,
      subtotal,
      gst: gstAmount,
      total,
      date: new Date().toLocaleDateString("en-IN"),
    };

    setOrders([...orders, newOrder]);
    setCart([]);
    setCartOpen(false);
    setPage("admin");
  };

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalGSTCollected = orders.reduce((acc, o) => acc + o.gst, 0);

  return (
    <div className="bg-black text-white min-h-screen font-serif overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/70 backdrop-blur-md px-6 md:px-16 py-4 flex justify-between items-center border-b border-zinc-800">
        <h1 className="text-2xl tracking-widest font-bold">KV</h1>
        <div className="hidden md:flex gap-10 text-sm tracking-wide">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("collection")}>Collection</button>
          <button onClick={() => setPage("about")}>About</button>
          <button onClick={() => setPage("private")}>Private</button>
          <button onClick={() => setPage("investor")}>Investors</button>
          <button onClick={() => setPage("admin")}>Admin</button>
        </div>
        <button onClick={() => setCartOpen(true)} className="relative">
          <ShoppingCart />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-600 text-black text-xs px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </button>
      </nav>

      <div className="pt-24">
        <AnimatePresence mode="wait">

          {/* HOME */}
          {page === "home" && (
            <motion.section key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen flex items-center justify-center text-center">
              <div>
                <h1 className="text-6xl font-bold tracking-widest">KV</h1>
                <p className="mt-4 text-gray-400">The House of Quiet Power</p>
              </div>
            </motion.section>
          )}

          {/* COLLECTION */}
          {page === "collection" && (
            <motion.section key="collection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 px-6 md:px-20">
              <h2 className="text-4xl text-center mb-16">Signature Collection</h2>
              <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                {products.map((product) => (
                  <Card key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <CardContent className="p-8">
                      <div className="h-64 bg-zinc-800 rounded-xl mb-6"></div>
                      <h3 className="text-2xl mb-2">{product.name}</h3>
                      <p className="text-gray-400 mb-4">₹{product.price.toLocaleString("en-IN")}</p>
                      <Button onClick={() => addToCart(product)} className="bg-yellow-600 text-black w-full rounded-xl">
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>
          )}

          {/* ADMIN DASHBOARD */}
          {page === "admin" && (
            <motion.section key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 px-6 md:px-20">
              <h2 className="text-4xl mb-12 text-center">Admin Dashboard</h2>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <Card className="bg-zinc-900 border border-zinc-800 rounded-2xl">
                  <CardContent className="p-6">
                    <p className="text-gray-400">Total Revenue</p>
                    <h3 className="text-2xl mt-2">₹{totalRevenue.toLocaleString("en-IN")}</h3>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border border-zinc-800 rounded-2xl">
                  <CardContent className="p-6">
                    <p className="text-gray-400">Total GST Collected (18%)</p>
                    <h3 className="text-2xl mt-2">₹{totalGSTCollected.toLocaleString("en-IN")}</h3>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border border-zinc-800 rounded-2xl">
                  <CardContent className="p-6">
                    <p className="text-gray-400">Total Orders</p>
                    <h3 className="text-2xl mt-2">{orders.length}</h3>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 overflow-x-auto">
                <h3 className="text-2xl mb-6">Order Reports</h3>
                {orders.length === 0 ? (
                  <p className="text-gray-400">No orders yet.</p>
                ) : (
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-zinc-700">
                      <tr>
                        <th className="py-2">Order ID</th>
                        <th>Date</th>
                        <th>Subtotal</th>
                        <th>GST</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-zinc-800">
                          <td className="py-2">{order.id}</td>
                          <td>{order.date}</td>
                          <td>₹{order.subtotal.toLocaleString("en-IN")}</td>
                          <td>₹{order.gst.toLocaleString("en-IN")}</td>
                          <td>₹{order.total.toLocaleString("en-IN")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed top-0 right-0 w-full sm:w-96 h-full bg-zinc-950 shadow-2xl z-50 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl">Your Cart</h3>
              <button onClick={() => setCartOpen(false)}>
                <X />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-400">Cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>₹{item.price.toLocaleString("en-IN")}</span>
                  </div>
                ))}

                <div className="border-t border-zinc-800 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{gstAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <Button onClick={handleCheckout} className="w-full bg-yellow-600 text-black mt-4 rounded-xl">
                  Complete Purchase
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-10 text-center text-gray-500 text-sm border-t border-zinc-800 mt-20">
        © {new Date().getFullYear()} KV Maison. All Rights Reserved.
      </footer>
    </div>
  );
}
