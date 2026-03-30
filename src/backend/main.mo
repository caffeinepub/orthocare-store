import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";

persistent actor {
  type Product = {
    id: Nat;
    name: Text;
    category: Text;
    description: Text;
    price: Float;
    rating: Float;
    reviewCount: Nat;
    inStock: Bool;
    doctorRecommended: Bool;
    imageUrl: Text;
  };

  type CartItem = {
    productId: Nat;
    quantity: Nat;
  };

  type Order = {
    id: Nat;
    userId: Principal;
    items: [CartItem];
    total: Float;
    status: Text;
    createdAt: Int;
  };

  type UserCart = { user: Principal; items: [CartItem] };
  type UserWishlist = { user: Principal; ids: [Nat] };
  type UserOrders = { user: Principal; orders: [Order] };

  transient var nextOrderId: Nat = 1;

  transient let products: [Product] = [
    { id=1; name="Knee Support Cap"; category="Knee Support"; description="Breathable compression knee cap for pain relief and sports protection."; price=399.0; rating=4.5; reviewCount=128; inStock=true; doctorRecommended=true; imageUrl=""; },
    { id=2; name="Hinged Knee Brace"; category="Knee Support"; description="Adjustable hinged brace providing medial/lateral knee support post-surgery."; price=899.0; rating=4.7; reviewCount=89; inStock=true; doctorRecommended=true; imageUrl=""; },
    { id=3; name="Lumbar Back Belt"; category="Back Support Belts"; description="Wide elastic lumbar belt for lower back pain and posture correction."; price=649.0; rating=4.4; reviewCount=210; inStock=true; doctorRecommended=true; imageUrl=""; },
    { id=4; name="Posture Corrector Belt"; category="Back Support Belts"; description="Shoulder-pull posture corrector belt to align spine throughout the day."; price=499.0; rating=4.3; reviewCount=154; inStock=true; doctorRecommended=false; imageUrl=""; },
    { id=5; name="Soft Cervical Collar"; category="Cervical Collars"; description="Foam cervical collar for neck support and whiplash recovery."; price=299.0; rating=4.6; reviewCount=76; inStock=true; doctorRecommended=true; imageUrl=""; },
    { id=6; name="Hard Cervical Collar"; category="Cervical Collars"; description="Rigid Philadelphia collar for cervical fracture and post-op support."; price=799.0; rating=4.8; reviewCount=42; inStock=true; doctorRecommended=true; imageUrl=""; },
    { id=7; name="Universal Arm Sling"; category="Arm Slings"; description="Adjustable arm sling for fractures, sprains and post-operative rest."; price=249.0; rating=4.2; reviewCount=93; inStock=true; doctorRecommended=false; imageUrl=""; },
    { id=8; name="Padded Arm Sling"; category="Arm Slings"; description="Extra-padded arm sling with thumb loop for maximum comfort."; price=349.0; rating=4.5; reviewCount=61; inStock=true; doctorRecommended=true; imageUrl=""; },
    { id=9; name="Wrist Support Brace"; category="Wrist & Ankle Braces"; description="Neoprene wrist brace for carpal tunnel and tendonitis relief."; price=349.0; rating=4.4; reviewCount=182; inStock=true; doctorRecommended=true; imageUrl=""; },
    { id=10; name="Ankle Stabilizer Brace"; category="Wrist & Ankle Braces"; description="Figure-8 ankle brace to prevent sprains and support ligament recovery."; price=449.0; rating=4.6; reviewCount=137; inStock=true; doctorRecommended=true; imageUrl=""; },
    { id=11; name="Coccyx Seat Cushion"; category="Orthopedic Cushions"; description="Memory foam coccyx cushion for back pain relief while sitting."; price=799.0; rating=4.7; reviewCount=305; inStock=true; doctorRecommended=true; imageUrl=""; },
    { id=12; name="Cervical Pillow"; category="Orthopedic Cushions"; description="Contour memory foam pillow for proper cervical spine alignment during sleep."; price=999.0; rating=4.8; reviewCount=241; inStock=true; doctorRecommended=true; imageUrl=""; }
  ];

  stable var stableCarts: [UserCart] = [];
  stable var stableWishlists: [UserWishlist] = [];
  stable var stableOrders: [UserOrders] = [];
  stable var stableNextOrderId: Nat = 1;

  transient var carts: HashMap.HashMap<Principal, [CartItem]> = HashMap.fromIter(
    Iter.map<UserCart, (Principal, [CartItem])>(stableCarts.vals(), func(u) { (u.user, u.items) }),
    16, Principal.equal, Principal.hash
  );
  transient var wishlists: HashMap.HashMap<Principal, [Nat]> = HashMap.fromIter(
    Iter.map<UserWishlist, (Principal, [Nat])>(stableWishlists.vals(), func(u) { (u.user, u.ids) }),
    16, Principal.equal, Principal.hash
  );
  transient var orders: HashMap.HashMap<Principal, [Order]> = HashMap.fromIter(
    Iter.map<UserOrders, (Principal, [Order])>(stableOrders.vals(), func(u) { (u.user, u.orders) }),
    16, Principal.equal, Principal.hash
  );

  system func preupgrade() {
    stableCarts := Iter.toArray(Iter.map<(Principal, [CartItem]), UserCart>(carts.entries(), func((p, items)) { { user=p; items } }));
    stableWishlists := Iter.toArray(Iter.map<(Principal, [Nat]), UserWishlist>(wishlists.entries(), func((p, ids)) { { user=p; ids } }));
    stableOrders := Iter.toArray(Iter.map<(Principal, [Order]), UserOrders>(orders.entries(), func((p, os)) { { user=p; orders=os } }));
    stableNextOrderId := nextOrderId;
  };

  system func postupgrade() {
    nextOrderId := stableNextOrderId;
  };

  public query func getProducts() : async [Product] {
    products
  };

  public query func getProductsByCategory(category: Text) : async [Product] {
    Array.filter(products, func(p: Product) : Bool { p.category == category })
  };

  public query func getProduct(id: Nat) : async ?Product {
    Array.find(products, func(p: Product) : Bool { p.id == id })
  };

  public shared(msg) func getCart() : async [CartItem] {
    switch (carts.get(msg.caller)) {
      case null { [] };
      case (?items) { items };
    }
  };

  public shared(msg) func addToCart(productId: Nat, quantity: Nat) : async () {
    let existing = switch (carts.get(msg.caller)) {
      case null { [] };
      case (?items) { items };
    };
    let found = Array.find(existing, func(i: CartItem) : Bool { i.productId == productId });
    let updated = switch found {
      case null { Array.append(existing, [{ productId; quantity }]) };
      case (?_) {
        Array.map(existing, func(i: CartItem) : CartItem {
          if (i.productId == productId) { { productId; quantity = i.quantity + quantity } }
          else { i }
        })
      };
    };
    carts.put(msg.caller, updated);
  };

  public shared(msg) func removeFromCart(productId: Nat) : async () {
    let existing = switch (carts.get(msg.caller)) {
      case null { [] };
      case (?items) { items };
    };
    carts.put(msg.caller, Array.filter(existing, func(i: CartItem) : Bool { i.productId != productId }));
  };

  public shared(msg) func clearCart() : async () {
    carts.put(msg.caller, []);
  };

  public shared(msg) func getWishlist() : async [Nat] {
    switch (wishlists.get(msg.caller)) {
      case null { [] };
      case (?ids) { ids };
    }
  };

  public shared(msg) func toggleWishlist(productId: Nat) : async () {
    let existing = switch (wishlists.get(msg.caller)) {
      case null { [] };
      case (?ids) { ids };
    };
    let found = Array.find(existing, func(id: Nat) : Bool { id == productId });
    let updated = switch found {
      case null { Array.append(existing, [productId]) };
      case (?_) { Array.filter(existing, func(id: Nat) : Bool { id != productId }) };
    };
    wishlists.put(msg.caller, updated);
  };

  public shared(msg) func placeOrder(items: [CartItem], total: Float) : async Nat {
    let orderId = nextOrderId;
    nextOrderId += 1;
    let order: Order = {
      id = orderId;
      userId = msg.caller;
      items;
      total;
      status = "Confirmed";
      createdAt = Time.now();
    };
    let existing = switch (orders.get(msg.caller)) {
      case null { [] };
      case (?os) { os };
    };
    orders.put(msg.caller, Array.append(existing, [order]));
    carts.put(msg.caller, []);
    orderId
  };

  public shared(msg) func getOrders() : async [Order] {
    switch (orders.get(msg.caller)) {
      case null { [] };
      case (?os) { os };
    }
  };
};
