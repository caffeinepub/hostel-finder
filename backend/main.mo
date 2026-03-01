import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";



actor {
  include MixinStorage();

  type HostelId = Nat;
  var nextHostelId : HostelId = 13;

  type Category = {
    #girls;
    #boys;
    #coLiving;
  };

  type RoomSharing = {
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

  type Hostel = {
    id : HostelId;
    name : Text;
    category : Category;
    description : Text;
    address : Text;
    roomCapacityDetails : RoomSharing;
    imageBlobs : [Storage.ExternalBlob];
    ownerContact : Text;
  };

  type UpdateHostelInput = {
    id : HostelId;
    roomCapacityDetails : RoomSharing;
  };

  let hostels = Map.empty<HostelId, Hostel>();

  func initializeSampleData() {
    let hostelsArray = [
      {
        id = 1;
        name = "Hemkund Boys Hostel";
        category = #boys;
        description = "Hostel with a focus on healthy nutritious multi-cuisine food for students.";
        address = "Plot No: 26, Vardhman Projects, Race Track Rd, Opposite Symbiosis College, Madhapur, Hyderabad, Telangana 500081";
        roomCapacityDetails = {
          sharing1 = 11200; // Price per bed for single room
          price1 = 11200;
          sharing2 = 7900; // Double sharing per bed
          price2 = 7900;
          sharing3 = 6600; // Triple sharing per bed
          price3 = 6600;
          sharing4 = 5400; // Four sharing per bed
          price4 = 5400;
          sharing5 = 5000; // Five sharing per bed (if applicable)
          price5 = 5000;
        };
        imageBlobs = [];
        ownerContact = "90909090";
      },
      {
        id = 2;
        name = "Secure Girl's Hostel Madhapur";
        category = #girls;
        description = "Hostel with a cctv camera, professional cooks, regular cleaning, and financial advice for students.";
        address = "2nd Right Lane, Opposite Prime hospital, beside DAV school, Hitech City Rd, Mathrusree Nagar, Madhapur, Hyderabad, Telangana 500081";
        roomCapacityDetails = {
          sharing1 = 12000;
          price1 = 12000;
          sharing2 = 8000;
          price2 = 8000;
          sharing3 = 6000;
          price3 = 6000;
          sharing4 = 5000;
          price4 = 5000;
          sharing5 = 4500; // Five sharing price
          price5 = 4500;
        };
        imageBlobs = [];
        ownerContact = "532423423423";
      },
      {
        id = 3;
        name = "The Soho Hyderabad - Gents";
        category = #coLiving;
        description = "Lively 35,000 sq ft boys coliving space housing over 160 residents, offering amenities like terrace garden, parking, gaming zones, and a gym.";
        address = "Plot 6, Hafu Classic, Siddhi Vinayak Nagar, Madhapur, Hyderabad, Telangana 500081";
        roomCapacityDetails = {
          sharing1 = 14000; // Price per bed for single room
          price1 = 14000;
          sharing2 = 9000;
          price2 = 9000;
          sharing3 = 6600; // Triple sharing per bed
          price3 = 6600;
          sharing4 = 5400; // Four sharing per bed
          price4 = 5400;
          sharing5 = 4800; // Five sharing price
          price5 = 4800;
        };
        imageBlobs = [];
        ownerContact = "";
      },
      {
        id = 4;
        name = "Sun Elite";
        category = #boys;
        description = "Hostel focused on healthy nutritious multi-cuisine food for students in Hyderabad.";
        address = "Building Number 11, Synergy Building, next to Sakhi multinational, Madhapur, Telangana 500081";
        roomCapacityDetails = {
          sharing1 = 12000;
          price1 = 12000;
          sharing2 = 8000;
          price2 = 8000;
          sharing3 = 6000;
          price3 = 6000;
          sharing4 = 5000;
          price4 = 5000;
          sharing5 = 4700; // Five sharing price
          price5 = 4700;
        };
        imageBlobs = [];
        ownerContact = "9090901209";
      },
      {
        id = 5;
        name = "Yoho - Keraam Boys Hostel (Blue Orchid Residency)";
        category = #boys;
        description = "Hostel for LGBT+ and international students with own kitchen, air conditioning and laundry cleaning in the rent.";
        address = "Plot No. 26/A, Opp, Durgam Cheruvu Bridge, Shilpa Enclave, Madhapur, Hyderabad, Telangana 500081";
        roomCapacityDetails = {
          sharing1 = 12000; // Price per bed for single room
          price1 = 12000;
          sharing2 = 8000; // Double sharing per bed
          price2 = 8000;
          sharing3 = 6000; // Triple sharing per bed
          price3 = 6000;
          sharing4 = 5000; // Four sharing per bed
          price4 = 5000;
          sharing5 = 4800; // Five sharing price
          price5 = 4800;
        };
        imageBlobs = [];
        ownerContact = "23424234";
      },
      {
        id = 6;
        name = "SOHO Gachibowli - Gents";
        category = #coLiving;
        description = "High end co-living offering for international students with AC, kitchen, and sleeping room, 90 rooms and over 230 beds.";
        address = "Ramalayam Sun residency, Telangana 500081";
        roomCapacityDetails = {
          sharing1 = 12000; // Price per bed for single room
          price1 = 12000;
          sharing2 = 8000; // Double sharing per bed
          price2 = 8000;
          sharing3 = 6000; // Triple sharing per bed
          price3 = 6000;
          sharing4 = 5000; // Four sharing per bed
          price4 = 5000;
          sharing5 = 4600; // Five sharing price
          price5 = 4600;
        };
        imageBlobs = [];
        ownerContact = "";
      },
      {
        id = 7;
        name = "Serenity Girls Hostel";
        category = #girls;
        description = "Affordable hostel for female students with library room and movie room.";
        address = "96, Hyderabad-Mahabubnagar Rd, IndiraNagar, Jillelguda, Hyderabad, Telangana 500079";
        roomCapacityDetails = {
          sharing1 = 15500; // Price per bed for single room
          price1 = 15500;
          sharing2 = 10000; // Double sharing per bed
          price2 = 10000;
          sharing3 = 6700; // Triple sharing per bed
          price3 = 6700;
          sharing4 = 5900; // Four sharing per bed
          price4 = 5900;
          sharing5 = 5700; // Five sharing price
          price5 = 5700;
        };
        imageBlobs = [];
        ownerContact = "";
      },
      {
        id = 8;
        name = "Kailash Boys Hostel";
        category = #boys;
        description = "Gym and pool hall for male students all included in rent.";
        address = "Pno 32,33, K-Shetra, SVLN Colony, Kamman, Hyderabad, Telangana 500084";
        roomCapacityDetails = {
          sharing1 = 16999; // Price per bed for single room
          price1 = 16999;
          sharing2 = 15250;
          price2 = 15250;
          sharing3 = 7900; // Triple sharing per bed
          price3 = 7900;
          sharing4 = 7100; // Four sharing per bed
          price4 = 7100;
          sharing5 = 6900; // Five sharing price
          price5 = 6900;
        };
        imageBlobs = [];
        ownerContact = "";
      },
      {
        id = 9;
        name = "Shree Ganesh Boys Hostel";
        category = #boys;
        description = "Healthy nutrition and sports activities included for students.";
        address = "Kondapur, Haihaka Colony, Hyderabad, Telangana 500084";
        roomCapacityDetails = {
          sharing1 = 15900; // Price per bed for single room
          price1 = 15900;
          sharing2 = 13900;
          price2 = 13900;
          sharing3 = 10500;
          price3 = 10500;
          sharing4 = 7300;
          price4 = 7300;
          sharing5 = 7000; // Five sharing price
          price5 = 7000;
        };
        imageBlobs = [];
        ownerContact = "";
      },
      {
        id = 10;
        name = "Asian Girls Hostel";
        category = #girls;
        description = "Artistic focus hostel for female students with yoga and painting classes included.";
        address = "Opposite New Girls Hostel, IS Sadan, Sector 2, Venkarayunagar, Hyderabad, Telangana 500095";
        roomCapacityDetails = {
          sharing1 = 15500; // Price per bed for single room
          price1 = 15500;
          sharing2 = 11500;
          price2 = 11500;
          sharing3 = 9200; // Triple sharing per bed
          price3 = 9200;
          sharing4 = 6900; // Four sharing per bed
          price4 = 6900;
          sharing5 = 6700; // Five sharing price
          price5 = 6700;
        };
        imageBlobs = [];
        ownerContact = "";
      },
      {
        id = 11;
        name = "Sapphire Women's Hostel";
        category = #girls;
        description = "Personal washing and drying machine for each tenant included in high end offer for female students.";
        address = "11-13-689, Mehra Apartment, Road no 3, Road no 3, Hyderabad, Telangana 500035";
        roomCapacityDetails = {
          sharing1 = 15899; // Price per bed for single room
          price1 = 15899;
          sharing2 = 11399; // Double sharing per bed
          price2 = 11399;
          sharing3 = 9899; // Triple sharing per bed
          price3 = 9899;
          sharing4 = 8799; // Four sharing per bed
          price4 = 8799;
          sharing5 = 8599; // Five sharing price
          price5 = 8599;
        };
        imageBlobs = [];
        ownerContact = "";
      },
      {
        id = 12;
        name = "The SOHO Hyderabad - Ladies";
        category = #girls;
        description = "35,000 sq ft girls coliving offering luxury amenities in Hyderabad.";
        address = "Plot 6, Hafu Classic, Siddhi Vinayak Nagar, Madhapur, Hyderabad, Telangana 500081";
        roomCapacityDetails = {
          sharing1 = 10000;
          price1 = 10000;
          sharing2 = 8000;
          price2 = 8000;
          sharing3 = 6500;
          price3 = 6500;
          sharing4 = 5000;
          price4 = 5000;
          sharing5 = 4700; // Five sharing price
          price5 = 4700;
        };
        imageBlobs = [];
        ownerContact = "";
      },
    ];

    for (hostel in hostelsArray.values()) {
      hostels.add(hostel.id, hostel);
    };
  };

  initializeSampleData();

  public shared ({ caller }) func addHostel(
    name : Text,
    category : Category,
    description : Text,
    address : Text,
    roomCapacityDetails : RoomSharing,
    imageBlobs : [Storage.ExternalBlob],
    ownerContact : Text,
  ) : async Hostel {
    let hostel : Hostel = {
      id = nextHostelId;
      name;
      category;
      description;
      address;
      roomCapacityDetails;
      imageBlobs;
      ownerContact;
    };

    hostels.add(nextHostelId, hostel);
    nextHostelId += 1;

    hostel;
  };

  public shared ({ caller }) func updateHostel(updateInput : UpdateHostelInput) : async () {
    switch (hostels.get(updateInput.id)) {
      case (null) { Runtime.trap("Hostel with id " # updateInput.id.toText() # " does not exist.") };
      case (?oldHostel) {
        let updatedHostel : Hostel = { oldHostel with roomCapacityDetails = updateInput.roomCapacityDetails };
        hostels.add(oldHostel.id, updatedHostel);
      };
    };
  };

  public query ({ caller }) func getHostel(hostelId : HostelId) : async Hostel {
    switch (hostels.get(hostelId)) {
      case (null) { Runtime.trap("Hostel does not exist.") };
      case (?hostel) { hostel };
    };
  };

  public query ({ caller }) func listHostels() : async [Hostel] {
    hostels.values().toArray();
  };

  public query ({ caller }) func listHostelsByCategory(category : Category) : async [Hostel] {
    hostels.values().toArray().filter(func(hostel) { hostel.category == category });
  };
};

