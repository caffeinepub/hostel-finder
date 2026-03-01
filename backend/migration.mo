import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldRoomSharing = {
    sharing1 : Nat;
    price1 : Nat;
    sharing2 : Nat;
    price2 : Nat;
    sharing3 : Nat;
    price3 : Nat;
    sharing4 : Nat;
    price4 : Nat;
    sharing5 : Nat;
    price5 : Nat;
  };

  type OldHostel = {
    id : Nat;
    name : Text;
    category : Text;
    description : Text;
    address : Text;
    latitude : Float;
    longitude : Float;
    roomCapacityDetails : OldRoomSharing;
    imageUrls : [Text];
    ownerContact : Text;
    isSponsored : Bool;
  };

  type OldActor = {
    hostels : Map.Map<Nat, OldHostel>;
    nextHostelId : Nat;
    visitorCount : Nat;
  };

  type NewRoomSharing = {
    sharing1 : Nat;
    price1 : Nat;
    sharing2 : Nat;
    price2 : Nat;
    sharing3 : Nat;
    price3 : Nat;
    sharing4 : Nat;
    price4 : Nat;
    sharing5 : Nat;
    price5 : Nat;
  };

  type NewHostel = {
    id : Nat;
    name : Text;
    category : Text;
    description : Text;
    address : Text;
    latitude : Float;
    longitude : Float;
    roomCapacityDetails : NewRoomSharing;
    imageUrls : [Text];
    ownerContact : Text;
    amenities : [Text];
    isSponsored : Bool;
  };

  type NewActor = {
    hostels : Map.Map<Nat, NewHostel>;
    nextHostelId : Nat;
    visitorCount : Nat;
  };

  func getAmenitiesForHostel(hostelId : Nat) : [Text] {
    switch (hostelId) {
      case (1) {
        return [
          "WiFi",
          "Laundry",
          "Meals",
          "Power Backup",
          "Security",
          "CCTV",
          "Study Room",
        ];
      };
      case (2) {
        return [
          "WiFi",
          "AC",
          "Laundry",
          "Parking",
          "Meals",
          "Gym",
          "Hot Water",
        ];
      };
      case (3) {
        return ["WiFi", "Laundry", "AC", "Gaming Zone", "Fitness Studio"];
      };
      case (4) {
        return ["WiFi", "Meals", "Power Backup", "Laundry", "Security"];
      };
      case (5) {
        return ["WiFi", "Laundry", "Inclusive Environment", "Parking", "Gym"];
      };
      case (6) {
        return ["WiFi", "AC", "Laundry", "Premium Fitness Center"];
      };
      case (7) {
        return ["WiFi", "Library", "Movie Room", "Meals", "Laundry"];
      };
      case (8) {
        return ["WiFi", "Gym", "Pool Hall", "Laundry", "Meals"];
      };
      case (9) {
        return ["WiFi", "Laundry", "AC", "Hot Water", "Fitness Center"];
      };
      case (10) {
        return ["WiFi", "Organic Food", "Fitness Area", "Laundry"];
      };
      case (11) {
        return ["WiFi", "Laundry", "Meals", "Parking"];
      };
      case (12) {
        return ["WiFi", "Cultural Activities", "Laundry", "Hot Water"];
      };
      case (_) { return [] };
    };
  };

  public func run(old : OldActor) : NewActor {
    let newHostels = old.hostels.map<Nat, OldHostel, NewHostel>(
      func(id, oldHostel) {
        {
          oldHostel with
          amenities = getAmenitiesForHostel(id);
        };
      }
    );
    {
      old with
      hostels = newHostels;
    };
  };
};
