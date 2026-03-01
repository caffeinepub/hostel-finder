import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldHostel = {
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
    isSponsored : Bool;
  };

  type OldActor = {
    nextHostelId : Nat;
    hostels : Map.Map<Nat, OldHostel>;
  };

  type NewActor = {
    nextHostelId : Nat;
    hostels : Map.Map<Nat, NewHostel>;
    visitorCount : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let newHostels = old.hostels.map<Nat, OldHostel, NewHostel>(
      func(_id, oldHostel) {
        { oldHostel with isSponsored = false };
      }
    );
    {
      old with
      hostels = newHostels;
      visitorCount = 0;
    };
  };
};
