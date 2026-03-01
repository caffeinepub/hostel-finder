import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from '@tanstack/react-router';
import { useGetHostel } from '../hooks/useQueries';
import { useUpdateHostel } from '../hooks/useMutations';
import { RoomSharing } from '../backend';
import { ArrowLeft, Loader2, Save, X, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const COMMON_AMENITIES = [
  'WiFi',
  'AC',
  'Laundry',
  'Parking',
  'Meals',
  'Gym',
  'Hot Water',
  'Power Backup',
  'Security',
  'CCTV',
  'Study Room',
  'Common Kitchen',
  'Library',
  'Movie Room',
  'Gaming Zone',
];

export default function EditHostel() {
  const { id } = useParams({ from: '/edit-hostel/$id' });
  const navigate = useNavigate();
  const hostelId = BigInt(id);
  const { data: hostel, isLoading, error } = useGetHostel(hostelId);
  const updateHostelMutation = useUpdateHostel();

  const [sharing1, setSharing1] = useState('');
  const [price1, setPrice1] = useState('');
  const [sharing2, setSharing2] = useState('');
  const [price2, setPrice2] = useState('');
  const [sharing3, setSharing3] = useState('');
  const [price3, setPrice3] = useState('');
  const [sharing4, setSharing4] = useState('');
  const [price4, setPrice4] = useState('');
  const [sharing5, setSharing5] = useState('');
  const [price5, setPrice5] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  useEffect(() => {
    if (hostel) {
      setSharing1(hostel.roomCapacityDetails.sharing1.toString());
      setPrice1(hostel.roomCapacityDetails.price1.toString());
      setSharing2(hostel.roomCapacityDetails.sharing2.toString());
      setPrice2(hostel.roomCapacityDetails.price2.toString());
      setSharing3(hostel.roomCapacityDetails.sharing3.toString());
      setPrice3(hostel.roomCapacityDetails.price3.toString());
      setSharing4(hostel.roomCapacityDetails.sharing4.toString());
      setPrice4(hostel.roomCapacityDetails.price4.toString());
      setSharing5(hostel.roomCapacityDetails.sharing5.toString());
      setPrice5(hostel.roomCapacityDetails.price5.toString());
      // Pre-populate amenities from hostel data
      setSelectedAmenities(hostel.amenities ?? []);
    }
  }, [hostel]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const sharingValues = [sharing1, sharing2, sharing3, sharing4, sharing5];
    const priceValues = [price1, price2, price3, price4, price5];

    for (let i = 0; i < 5; i++) {
      const sharing = parseInt(sharingValues[i]);
      const price = parseInt(priceValues[i]);

      if (isNaN(sharing) || sharing < 0) {
        toast.error(`Room capacity ${i + 1} must be a valid number`);
        return;
      }

      if (isNaN(price) || price < 0) {
        toast.error(`Price ${i + 1} must be a valid positive number`);
        return;
      }
    }

    const roomCapacityDetails: RoomSharing = {
      sharing1: BigInt(sharing1),
      price1: BigInt(price1),
      sharing2: BigInt(sharing2),
      price2: BigInt(price2),
      sharing3: BigInt(sharing3),
      price3: BigInt(price3),
      sharing4: BigInt(sharing4),
      price4: BigInt(price4),
      sharing5: BigInt(sharing5),
      price5: BigInt(price5),
    };

    try {
      await updateHostelMutation.mutateAsync({
        id: hostelId,
        roomCapacityDetails,
        amenities: selectedAmenities,
      });

      toast.success('Hostel updated successfully!');
      navigate({ to: '/hostel/$id', params: { id } });
    } catch (error) {
      toast.error('Failed to update hostel. Please try again.');
      console.error('Update error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-warm-primary" />
      </div>
    );
  }

  if (error || !hostel) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center">
            <p className="text-lg text-muted-foreground mb-4">Hostel not found</p>
            <Link to="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <Link to="/hostel/$id" params={{ id }} className="inline-block mb-6">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Hostel
        </Button>
      </Link>

      <Card className="border-warm-border shadow-lg">
        <CardHeader className="bg-gradient-to-br from-warm-primary to-warm-accent text-white">
          <CardTitle className="text-2xl">Edit Hostel Details</CardTitle>
          <CardDescription className="text-white/80">
            Update room sharing options, pricing, and amenities for {hostel.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Room Sharing Options */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Room Sharing & Pricing</h3>

              {/* Sharing Option 1 - One Sharing Room */}
              <Card className="border-warm-border/50">
                <CardHeader>
                  <CardTitle className="text-base">One Sharing Room</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sharing1">Room Capacity (persons)</Label>
                    <Input
                      id="sharing1"
                      type="number"
                      min="0"
                      value={sharing1}
                      onChange={(e) => setSharing1(e.target.value)}
                      placeholder="e.g., 1 for single room"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price1">Price per Bed (₹/month)</Label>
                    <Input
                      id="price1"
                      type="number"
                      min="0"
                      value={price1}
                      onChange={(e) => setPrice1(e.target.value)}
                      placeholder="e.g., 10000"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Sharing Option 2 - Two Sharing Room */}
              <Card className="border-warm-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Two Sharing Room</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sharing2">Room Capacity (persons)</Label>
                    <Input
                      id="sharing2"
                      type="number"
                      min="0"
                      value={sharing2}
                      onChange={(e) => setSharing2(e.target.value)}
                      placeholder="e.g., 2 for double sharing"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price2">Price per Bed (₹/month)</Label>
                    <Input
                      id="price2"
                      type="number"
                      min="0"
                      value={price2}
                      onChange={(e) => setPrice2(e.target.value)}
                      placeholder="e.g., 8000"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Sharing Option 3 - Three Sharing Room */}
              <Card className="border-warm-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Three Sharing Room</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sharing3">Room Capacity (persons)</Label>
                    <Input
                      id="sharing3"
                      type="number"
                      min="0"
                      value={sharing3}
                      onChange={(e) => setSharing3(e.target.value)}
                      placeholder="e.g., 3 for triple sharing"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price3">Price per Bed (₹/month)</Label>
                    <Input
                      id="price3"
                      type="number"
                      min="0"
                      value={price3}
                      onChange={(e) => setPrice3(e.target.value)}
                      placeholder="e.g., 6000"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Sharing Option 4 - Four Sharing Room */}
              <Card className="border-warm-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Four Sharing Room</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sharing4">Room Capacity (persons)</Label>
                    <Input
                      id="sharing4"
                      type="number"
                      min="0"
                      value={sharing4}
                      onChange={(e) => setSharing4(e.target.value)}
                      placeholder="e.g., 4 for four sharing"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price4">Price per Bed (₹/month)</Label>
                    <Input
                      id="price4"
                      type="number"
                      min="0"
                      value={price4}
                      onChange={(e) => setPrice4(e.target.value)}
                      placeholder="e.g., 5000"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Sharing Option 5 - Five Sharing Room */}
              <Card className="border-warm-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Five Sharing Room</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sharing5">Room Capacity (persons)</Label>
                    <Input
                      id="sharing5"
                      type="number"
                      min="0"
                      value={sharing5}
                      onChange={(e) => setSharing5(e.target.value)}
                      placeholder="e.g., 5 for five sharing"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price5">Price per Bed (₹/month)</Label>
                    <Input
                      id="price5"
                      type="number"
                      min="0"
                      value={price5}
                      onChange={(e) => setPrice5(e.target.value)}
                      placeholder="e.g., 4500"
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Amenities Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-warm-primary" />
                <h3 className="text-lg font-semibold text-foreground">Amenities</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Select all amenities available at this hostel.
              </p>
              <Card className="border-warm-border/50">
                <CardContent className="pt-5">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {COMMON_AMENITIES.map((amenity) => {
                      const checked = selectedAmenities.includes(amenity);
                      return (
                        <label
                          key={amenity}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors select-none ${
                            checked
                              ? 'bg-warm-primary/10 border-warm-primary/40 text-warm-primary'
                              : 'bg-background border-warm-border text-foreground hover:bg-muted/50'
                          }`}
                        >
                          <Checkbox
                            id={`amenity-${amenity}`}
                            checked={checked}
                            onCheckedChange={() => toggleAmenity(amenity)}
                            className="flex-shrink-0"
                          />
                          <span className="text-sm font-medium leading-tight">{amenity}</span>
                        </label>
                      );
                    })}
                  </div>
                  {selectedAmenities.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-3">
                      {selectedAmenities.length} amenit{selectedAmenities.length === 1 ? 'y' : 'ies'} selected
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-warm-primary to-warm-accent hover:from-warm-primary/90 hover:to-warm-accent/90"
                disabled={updateHostelMutation.isPending}
              >
                {updateHostelMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
              <Link to="/hostel/$id" params={{ id }} className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
