import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Migration "migration";

(with migration = Migration.run)
actor {
  include MixinStorage();

  type HostelId = Nat;
  var nextHostelId : HostelId = 13;

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
    category : Text;
    description : Text;
    address : Text;
    latitude : Float;
    longitude : Float;
    roomCapacityDetails : RoomSharing;
    imageUrls : [Text];
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
        category = "Boys";
        description = "Hostel with a focus on healthy nutritious multi-cuisine food for students.";
        address = "Plot No: 26, Vardhman Projects, Race Track Rd, Opposite Symbiosis College, Madhapur, Hyderabad, Telangana 500081";
        latitude = 17.4440;
        longitude = 78.3845;
        roomCapacityDetails = {
          sharing1 = 11200;
          price1 = 11200;
          sharing2 = 7900;
          price2 = 7900;
          sharing3 = 6600;
          price3 = 6600;
          sharing4 = 5400;
          price4 = 5400;
          sharing5 = 5000;
          price5 = 5000;
        };
        imageUrls = [
          "/assets/generated/hostel_images/hemkund_boys_hostel_1.jpg",
          "/assets/generated/hostel_images/hemkund_boys_hostel_2.jpg",
        ];
        ownerContact = "90909090";
      },
      {
        id = 2;
        name = "Secure Girl's Hostel Madhapur";
        category = "Girls";
        description = "Hostel with cctv cameras, professional cooks, and regular cleaning services.";
        address = "2nd Right Lane, Opposite Prime hospital, beside DAV school, Hitech City Rd, Mathrusree Nagar, Madhapur, Hyderabad, Telangana 500081";
        latitude = 17.4486;
        longitude = 78.3915;
        roomCapacityDetails = {
          sharing1 = 12000;
          price1 = 12000;
          sharing2 = 8000;
          price2 = 8000;
          sharing3 = 6000;
          price3 = 6000;
          sharing4 = 5000;
          price4 = 5000;
          sharing5 = 4500;
          price5 = 4500;
        };
        imageUrls = [
          "/assets/generated/hostel_images/secure_girls_hostel_1.jpg",
          "/assets/generated/hostel_images/secure_girls_hostel_2.jpg",
        ];
        ownerContact = "532423423423";
      },
      {
        id = 3;
        name = "The Soho Hyderabad - Gents";
        category = "Co-Living";
        description = "Lively 35,000 sq ft boys coliving space with amenities like terrace garden, parking, gaming zones, and a gym.";
        address = "Plot 6, Hafu Classic, Siddhi Vinayak Nagar, Madhapur, Hyderabad, Telangana 500081";
        latitude = 17.4429;
        longitude = 78.3835;
        roomCapacityDetails = {
          sharing1 = 14000;
          price1 = 14000;
          sharing2 = 9000;
          price2 = 9000;
          sharing3 = 6600;
          price3 = 6600;
          sharing4 = 5400;
          price4 = 5400;
          sharing5 = 4800;
          price5 = 4800;
        };
        imageUrls = [
          "/assets/generated/hostel_images/soho_gents_1.jpg",
          "/assets/generated/hostel_images/soho_gents_2.jpg",
        ];
        ownerContact = "845066445";
      },
      {
        id = 4;
        name = "Sun Elite";
        category = "Boys";
        description = "Hostel focused on healthy food and comfortable living for students in Hyderabad.";
        address = "Building Number 11, Synergy Building, next to Sakhi multinational, Madhapur, Telangana 500081";
        latitude = 17.4509;
        longitude = 78.3824;
        roomCapacityDetails = {
          sharing1 = 12000;
          price1 = 12000;
          sharing2 = 8000;
          price2 = 8000;
          sharing3 = 6000;
          price3 = 6000;
          sharing4 = 5000;
          price4 = 5000;
          sharing5 = 4700;
          price5 = 4700;
        };
        imageUrls = [
          "/assets/generated/hostel_images/sun_elite_1.jpg",
          "/assets/generated/hostel_images/sun_elite_2.jpg",
        ];
        ownerContact = "9090901209";
      },
      {
        id = 5;
        name = "Yoho - Keraam Boys Hostel (Blue Orchid Residency)";
        category = "Boys";
        description = "Hostel catering to LGBT+ and international students with inclusive amenities.";
        address = "Plot No. 26/A, Opp, Durgam Cheruvu Bridge, Shilpa Enclave, Madhapur, Hyderabad, Telangana 500081";
        latitude = 17.4435;
        longitude = 78.3863;
        roomCapacityDetails = {
          sharing1 = 12000;
          price1 = 12000;
          sharing2 = 8000;
          price2 = 8000;
          sharing3 = 6000;
          price3 = 6000;
          sharing4 = 5000;
          price4 = 5000;
          sharing5 = 4800;
          price5 = 4800;
        };
        imageUrls = [
          "/assets/generated/hostel_images/yoho_keraam_1.jpg",
          "/assets/generated/hostel_images/yoho_keraam_2.jpg",
        ];
        ownerContact = "23424234";
      },
      {
        id = 6;
        name = "SOHO Gachibowli - Gents";
        category = "Co-Living";
        description = "High-end co-living option for international students with premium amenities.";
        address = "Ramalayam Sun residency, Telangana 500081";
        latitude = 17.4300;
        longitude = 78.4277;
        roomCapacityDetails = {
          sharing1 = 12000;
          price1 = 12000;
          sharing2 = 8000;
          price2 = 8000;
          sharing3 = 6000;
          price3 = 6000;
          sharing4 = 5000;
          price4 = 5000;
          sharing5 = 4600;
          price5 = 4600;
        };
        imageUrls = [
          "/assets/generated/hostel_images/soho_gachibowli_1.jpg",
          "/assets/generated/hostel_images/soho_gachibowli_2.jpg",
        ];
        ownerContact = "965467600";
      },
      {
        id = 7;
        name = "Serenity Girls Hostel";
        category = "Girls";
        description = "Affordable hostel for female students with library and movie rooms.";
        address = "96, Hyderabad-Mahabubnagar Rd, IndiraNagar, Jillelguda, Hyderabad, Telangana 500079";
        latitude = 17.4364;
        longitude = 78.5362;
        roomCapacityDetails = {
          sharing1 = 15500;
          price1 = 15500;
          sharing2 = 10000;
          price2 = 10000;
          sharing3 = 6700;
          price3 = 6700;
          sharing4 = 5900;
          price4 = 5900;
          sharing5 = 5700;
          price5 = 5700;
        };
        imageUrls = [
          "/assets/generated/hostel_images/serenity_girls_1.jpg",
          "/assets/generated/hostel_images/serenity_girls_2.jpg",
        ];
        ownerContact = "722388188";
      },
      {
        id = 8;
        name = "Kailash Boys Hostel";
        category = "Boys";
        description = "Hostel with gym and pool hall included in rent.";
        address = "Pno 32,33, K-Shetra, SVLN Colony, Kamman, Hyderabad, Telangana 500084";
        latitude = 17.4022;
        longitude = 78.4655;
        roomCapacityDetails = {
          sharing1 = 16999;
          price1 = 16999;
          sharing2 = 15250;
          price2 = 15250;
          sharing3 = 7900;
          price3 = 7900;
          sharing4 = 7100;
          price4 = 7100;
          sharing5 = 6900;
          price5 = 6900;
        };
        imageUrls = [
          "/assets/generated/hostel_images/kailash_boys_1.jpg",
          "/assets/generated/hostel_images/kailash_boys_2.jpg",
        ];
        ownerContact = "91103030";
      },
      {
        id = 9;
        name = "The SOHO Hyderabad - Ladies";
        category = "Girls";
        description = "35,000 sq ft girls coliving offering luxury amenities.";
        address = "Plot 6, Hafu Classic, Siddhi Vinayak Nagar, Madhapur, Hyderabad, Telangana 500081";
        latitude = 17.4496;
        longitude = 78.3880;
        roomCapacityDetails = {
          sharing1 = 10000;
          price1 = 10000;
          sharing2 = 8000;
          price2 = 8000;
          sharing3 = 6500;
          price3 = 6500;
          sharing4 = 5000;
          price4 = 5000;
          sharing5 = 4700;
          price5 = 4700;
        };
        imageUrls = [
          "/assets/generated/hostel_images/soho_ladies_1.jpg",
          "/assets/generated/hostel_images/soho_ladies_2.jpg",
        ];
        ownerContact = "963876903";
      },
      {
        id = 10;
        name = "Green Nest Co-Living";
        category = "Co-Living";
        description = "Eco-friendly co-living space with organic food options and fitness amenities.";
        address = "Plot No. 7, Green Hills, Gachibowli, Hyderabad, Telangana 500032";
        latitude = 17.4013;
        longitude = 78.4483;
        roomCapacityDetails = {
          sharing1 = 10000;
          price1 = 10000;
          sharing2 = 8000;
          price2 = 8000;
          sharing3 = 6500;
          price3 = 6500;
          sharing4 = 5000;
          price4 = 5000;
          sharing5 = 4700;
          price5 = 4700;
        };
        imageUrls = [
          "/assets/generated/hostel_images/green_nest_coliving_1.jpg",
          "/assets/generated/hostel_images/green_nest_coliving_2.jpg",
        ];
        ownerContact = "988654003";
      },
      {
        id = 11;
        name = "Blueberry Boys Hostel";
        category = "Boys";
        description = "Affordable hostel with modern amenities and nutritious meals for male students.";
        address = "Plot No. 14, Blueberry Lane, Kukatpally, Hyderabad, Telangana 500072";
        latitude = 17.4875;
        longitude = 78.3910;
        roomCapacityDetails = {
          sharing1 = 10500;
          price1 = 10500;
          sharing2 = 7500;
          price2 = 7500;
          sharing3 = 5800;
          price3 = 5800;
          sharing4 = 4800;
          price4 = 4800;
          sharing5 = 4500;
          price5 = 4500;
        };
        imageUrls = [
          "/assets/generated/hostel_images/blueberry_boys_1.jpg",
          "/assets/generated/hostel_images/blueberry_boys_2.jpg",
        ];
        ownerContact = "998812300";
      },
      {
        id = 12;
        name = "Pink Petal Girls Hostel";
        category = "Girls";
        description = "Hostel with focus on arts and culture, offering workshops and events for female students.";
        address = "Plot No. 22, Pink Blossom Avenue, Ameerpet, Hyderabad, Telangana 500016";
        latitude = 17.4365;
        longitude = 78.4477;
        roomCapacityDetails = {
          sharing1 = 12000;
          price1 = 12000;
          sharing2 = 8500;
          price2 = 8500;
          sharing3 = 6800;
          price3 = 6800;
          sharing4 = 5000;
          price4 = 5000;
          sharing5 = 4700;
          price5 = 4700;
        };
        imageUrls = [
          "/assets/generated/hostel_images/pink_petal_girls_1.jpg",
          "/assets/generated/hostel_images/pink_petal_girls_2.jpg",
        ];
        ownerContact = "955910308";
      },
    ];

    for (hostel in hostelsArray.values()) {
      hostels.add(hostel.id, hostel);
    };
  };

  initializeSampleData();

  public shared ({ caller }) func addHostel(
    name : Text,
    category : Text,
    description : Text,
    address : Text,
    latitude : Float,
    longitude : Float,
    roomCapacityDetails : RoomSharing,
    imageUrls : [Text],
    ownerContact : Text,
  ) : async Hostel {
    let hostel : Hostel = {
      id = nextHostelId;
      name;
      category;
      description;
      address;
      latitude;
      longitude;
      roomCapacityDetails;
      imageUrls;
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

  public query ({ caller }) func getHostelsByCategory(category : Text) : async [Hostel] {
    hostels.values().toArray().filter(func(hostel) { Text.equal(hostel.category, category) });
  };
};
