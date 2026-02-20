import { useState, FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MapPin } from 'lucide-react';
import { useAddHostel } from '@/hooks/useMutations';
import { Category } from '@/backend';
import MapLocationPicker from '@/components/MapLocationPicker';
import { toast } from 'sonner';

interface RoomSharingForm {
  sharing1Enabled: boolean;
  sharing1Price: string;
  sharing2Enabled: boolean;
  sharing2Price: string;
  sharing3Enabled: boolean;
  sharing3Price: string;
  sharing4Enabled: boolean;
  sharing4Price: string;
  sharing5Enabled: boolean;
  sharing5Price: string;
}

export default function AddHostel() {
  const navigate = useNavigate();
  const { mutate: addHostel, isPending, isError, error } = useAddHostel();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [ownerContact, setOwnerContact] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [roomSharing, setRoomSharing] = useState<RoomSharingForm>({
    sharing1Enabled: false,
    sharing1Price: '',
    sharing2Enabled: false,
    sharing2Price: '',
    sharing3Enabled: false,
    sharing3Price: '',
    sharing4Enabled: false,
    sharing4Price: '',
    sharing5Enabled: false,
    sharing5Price: '',
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleLocationSelect = (selectedAddress: string, lat: number, lng: number) => {
    setAddress(selectedAddress);
    setLatitude(lat);
    setLongitude(lng);
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!name.trim()) errors.push('Hostel name is required');
    if (!category) errors.push('Category is required');
    if (!description.trim()) errors.push('Description is required');
    if (!address.trim()) errors.push('Address is required');
    if (!ownerContact.trim()) errors.push('Owner contact is required');

    const hasAtLeastOneRoom =
      roomSharing.sharing1Enabled ||
      roomSharing.sharing2Enabled ||
      roomSharing.sharing3Enabled ||
      roomSharing.sharing4Enabled ||
      roomSharing.sharing5Enabled;

    if (!hasAtLeastOneRoom) {
      errors.push('At least one room sharing option must be enabled');
    }

    if (roomSharing.sharing1Enabled && !roomSharing.sharing1Price) {
      errors.push('Single room price is required');
    }
    if (roomSharing.sharing2Enabled && !roomSharing.sharing2Price) {
      errors.push('Double sharing price is required');
    }
    if (roomSharing.sharing3Enabled && !roomSharing.sharing3Price) {
      errors.push('Triple sharing price is required');
    }
    if (roomSharing.sharing4Enabled && !roomSharing.sharing4Price) {
      errors.push('Four sharing price is required');
    }
    if (roomSharing.sharing5Enabled && !roomSharing.sharing5Price) {
      errors.push('Five sharing price is required');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the validation errors');
      return;
    }

    const roomCapacityDetails = {
      sharing1: roomSharing.sharing1Enabled ? BigInt(roomSharing.sharing1Price) : BigInt(0),
      price1: roomSharing.sharing1Enabled ? BigInt(roomSharing.sharing1Price) : BigInt(0),
      sharing2: roomSharing.sharing2Enabled ? BigInt(roomSharing.sharing2Price) : BigInt(0),
      price2: roomSharing.sharing2Enabled ? BigInt(roomSharing.sharing2Price) : BigInt(0),
      sharing3: roomSharing.sharing3Enabled ? BigInt(roomSharing.sharing3Price) : BigInt(0),
      price3: roomSharing.sharing3Enabled ? BigInt(roomSharing.sharing3Price) : BigInt(0),
      sharing4: roomSharing.sharing4Enabled ? BigInt(roomSharing.sharing4Price) : BigInt(0),
      price4: roomSharing.sharing4Enabled ? BigInt(roomSharing.sharing4Price) : BigInt(0),
      sharing5: roomSharing.sharing5Enabled ? BigInt(roomSharing.sharing5Price) : BigInt(0),
      price5: roomSharing.sharing5Enabled ? BigInt(roomSharing.sharing5Price) : BigInt(0),
    };

    addHostel(
      {
        name: name.trim(),
        category: category as Category,
        description: description.trim(),
        address: address.trim(),
        roomCapacityDetails,
        imageBlobs: [],
        ownerContact: ownerContact.trim(),
      },
      {
        onSuccess: (hostel) => {
          toast.success('Hostel added successfully!');
          navigate({ to: `/hostel/${hostel.id}` });
        },
        onError: (err) => {
          toast.error('Failed to add hostel. Please try again.');
          console.error('Error adding hostel:', err);
        },
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-warm-primary mb-2">Add New Hostel</h1>
        <p className="text-muted-foreground">Fill in the details to list a new hostel</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the hostel's basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Hostel Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter hostel name"
                className="border-warm-border focus:ring-warm-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
                <SelectTrigger className="border-warm-border focus:ring-warm-primary">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Category.girls}>Girls</SelectItem>
                  <SelectItem value={Category.boys}>Boys</SelectItem>
                  <SelectItem value={Category.coLiving}>Co-Living</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the hostel, its amenities, and unique features"
                rows={4}
                className="border-warm-border focus:ring-warm-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerContact">Owner Contact *</Label>
              <Input
                id="ownerContact"
                value={ownerContact}
                onChange={(e) => setOwnerContact(e.target.value)}
                placeholder="Enter contact number"
                className="border-warm-border focus:ring-warm-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-warm-primary" />
              Location
            </CardTitle>
            <CardDescription>Search and select the hostel location on the map</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter or select address from map"
                className="border-warm-border focus:ring-warm-primary"
              />
            </div>

            <MapLocationPicker onLocationSelect={handleLocationSelect} />
          </CardContent>
        </Card>

        {/* Room Sharing Options */}
        <Card>
          <CardHeader>
            <CardTitle>Room Sharing & Pricing</CardTitle>
            <CardDescription>Select available room types and set prices per bed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Single Room */}
              <div className="border border-warm-border rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sharing1"
                    checked={roomSharing.sharing1Enabled}
                    onCheckedChange={(checked) =>
                      setRoomSharing({ ...roomSharing, sharing1Enabled: checked as boolean })
                    }
                  />
                  <Label htmlFor="sharing1" className="font-semibold cursor-pointer">
                    Single Room
                  </Label>
                </div>
                {roomSharing.sharing1Enabled && (
                  <div className="space-y-2">
                    <Label htmlFor="sharing1Price" className="text-sm">
                      Price per bed (₹)
                    </Label>
                    <Input
                      id="sharing1Price"
                      type="number"
                      value={roomSharing.sharing1Price}
                      onChange={(e) => setRoomSharing({ ...roomSharing, sharing1Price: e.target.value })}
                      placeholder="Enter price"
                      className="border-warm-border"
                    />
                  </div>
                )}
              </div>

              {/* Double Sharing */}
              <div className="border border-warm-border rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sharing2"
                    checked={roomSharing.sharing2Enabled}
                    onCheckedChange={(checked) =>
                      setRoomSharing({ ...roomSharing, sharing2Enabled: checked as boolean })
                    }
                  />
                  <Label htmlFor="sharing2" className="font-semibold cursor-pointer">
                    Double Sharing
                  </Label>
                </div>
                {roomSharing.sharing2Enabled && (
                  <div className="space-y-2">
                    <Label htmlFor="sharing2Price" className="text-sm">
                      Price per bed (₹)
                    </Label>
                    <Input
                      id="sharing2Price"
                      type="number"
                      value={roomSharing.sharing2Price}
                      onChange={(e) => setRoomSharing({ ...roomSharing, sharing2Price: e.target.value })}
                      placeholder="Enter price"
                      className="border-warm-border"
                    />
                  </div>
                )}
              </div>

              {/* Triple Sharing */}
              <div className="border border-warm-border rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sharing3"
                    checked={roomSharing.sharing3Enabled}
                    onCheckedChange={(checked) =>
                      setRoomSharing({ ...roomSharing, sharing3Enabled: checked as boolean })
                    }
                  />
                  <Label htmlFor="sharing3" className="font-semibold cursor-pointer">
                    Triple Sharing
                  </Label>
                </div>
                {roomSharing.sharing3Enabled && (
                  <div className="space-y-2">
                    <Label htmlFor="sharing3Price" className="text-sm">
                      Price per bed (₹)
                    </Label>
                    <Input
                      id="sharing3Price"
                      type="number"
                      value={roomSharing.sharing3Price}
                      onChange={(e) => setRoomSharing({ ...roomSharing, sharing3Price: e.target.value })}
                      placeholder="Enter price"
                      className="border-warm-border"
                    />
                  </div>
                )}
              </div>

              {/* Four Sharing */}
              <div className="border border-warm-border rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sharing4"
                    checked={roomSharing.sharing4Enabled}
                    onCheckedChange={(checked) =>
                      setRoomSharing({ ...roomSharing, sharing4Enabled: checked as boolean })
                    }
                  />
                  <Label htmlFor="sharing4" className="font-semibold cursor-pointer">
                    Four Sharing
                  </Label>
                </div>
                {roomSharing.sharing4Enabled && (
                  <div className="space-y-2">
                    <Label htmlFor="sharing4Price" className="text-sm">
                      Price per bed (₹)
                    </Label>
                    <Input
                      id="sharing4Price"
                      type="number"
                      value={roomSharing.sharing4Price}
                      onChange={(e) => setRoomSharing({ ...roomSharing, sharing4Price: e.target.value })}
                      placeholder="Enter price"
                      className="border-warm-border"
                    />
                  </div>
                )}
              </div>

              {/* Five Sharing */}
              <div className="border border-warm-border rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sharing5"
                    checked={roomSharing.sharing5Enabled}
                    onCheckedChange={(checked) =>
                      setRoomSharing({ ...roomSharing, sharing5Enabled: checked as boolean })
                    }
                  />
                  <Label htmlFor="sharing5" className="font-semibold cursor-pointer">
                    Five Sharing
                  </Label>
                </div>
                {roomSharing.sharing5Enabled && (
                  <div className="space-y-2">
                    <Label htmlFor="sharing5Price" className="text-sm">
                      Price per bed (₹)
                    </Label>
                    <Input
                      id="sharing5Price"
                      type="number"
                      value={roomSharing.sharing5Price}
                      onChange={(e) => setRoomSharing({ ...roomSharing, sharing5Price: e.target.value })}
                      placeholder="Enter price"
                      className="border-warm-border"
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="font-semibold text-destructive">Please fix the following errors:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-destructive">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-warm-primary hover:bg-warm-accent text-white"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding Hostel...
              </>
            ) : (
              'Add Hostel'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: '/' })}
            disabled={isPending}
            className="border-warm-border"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
