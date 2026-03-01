import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldCategory = {
    #girls;
    #boys;
    #coLiving;
  };

  type OldHostel = {
    id : Nat;
    name : Text;
    category : OldCategory;
    description : Text;
    address : Text;
    latitude : Float;
    longitude : Float;
    roomCapacityDetails : {
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
    imageUrls : [Text];
    ownerContact : Text;
  };

  type OldActor = {
    hostels : Map.Map<Nat, OldHostel>;
  };

  type NewHostel = {
    id : Nat;
    name : Text;
    category : Text;
    description : Text;
    address : Text;
    latitude : Float;
    longitude : Float;
    roomCapacityDetails : {
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
    imageUrls : [Text];
    ownerContact : Text;
  };

  type NewActor = {
    hostels : Map.Map<Nat, NewHostel>;
  };

  func convertCategory(cat : OldCategory) : Text {
    switch (cat) {
      case (#girls) { "Girls" };
      case (#boys) { "Boys" };
      case (#coLiving) { "Co-Living" };
    };
  };

  public func run(old : OldActor) : NewActor {
    let newHostels = old.hostels.map<Nat, OldHostel, NewHostel>(
      func(_id, oldHostel) {
        {
          oldHostel with
          category = convertCategory(oldHostel.category)
        };
      }
    );
    { hostels = newHostels };
  };
};
