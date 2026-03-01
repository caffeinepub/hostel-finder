import { useState, FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MapPin, Image as ImageIcon, Plus, X } from 'lucide-react';
import { useAddHostel } from '@/hooks/useMutations';
import MapLocationPicker from '@/components/MapLocationPicker';
import { toast } from 'sonner';

type HostelCategory = 'Girls' | 'Boys' | 'Co-Living';

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
  const { mutate: addHostel, isPending } = useAddHostel();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<HostelCategory | ''>('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [ownerContact, setOwnerContact] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>(['']);

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

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrlField = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const updateImageUrl = (index: number, value: string) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
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

    if (roomSharing.sharing1Enabled && !roomSharing.sharing1Price)
      errors.push('Single room price is required');
    if (roomSharing.sharing2Enabled && !roomSharing.sharing2Price)
      errors.push('Double sharing price is required');
    if (roomSharing.sharing3Enabled && !roomSharing.sharing3Price)
      errors.push('Triple sharing price is required');
    if (roomSharing.sharing4Enabled && !roomSharing.sharing4Price)
      errors.push('Four sharing price is required');
    if (roomSharing.sharing5Enabled && !roomSharing.sharing5Price)
      errors.push('Five sharing price is required');

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

    // Filter out empty image URLs
    const filteredImageUrls = imageUrls.filter((url) => url.trim() !== '');

    addHostel(
      {
        name: name.trim(),
        category: category as HostelCategory,
        description: description.trim(),
        address: address.trim(),
        latitude: latitude ?? 17.385,
        longitude: longitude ?? 78.4867,
        roomCapacityDetails,
        imageUrls: filteredImageUrls,
        ownerContact: ownerContact.trim(),
      },
      {
        onSuccess: (hostel) => {
          toast.success('Hostel added successfully!');
          navigate({ to: '/hostel/$id', params: { id: hostel.id.toString() } });
        },
        onError: (err) => {
          toast.error('Failed to add hostel. Please try again.');
          console.error('Error adding hostel:', err);
        },
      }
    );
  };

  const sharingOptions = [
    { key: 'sharing1', label: 'Single Room (1 person)', enabledKey: 'sharing1Enabled' as const, priceKey: 'sharing1Price' as const },
    { key: 'sharing2', label: 'Double Sharing (2 persons)', enabledKey: 'sharing2Enabled' as const, priceKey: 'sharing2Price' as const },
    { key: 'sharing3', label: 'Triple Sharing (3 persons)', enabledKey: 'sharing3Enabled' as const, priceKey: 'sharing3Price' as const },
    { key: 'sharing4', label: 'Four Sharing (4 persons)', enabledKey: 'sharing4Enabled' as const, priceKey: 'sharing4Price' as const },
    { key: 'sharing5', label: 'Five Sharing (5 persons)', enabledKey: 'sharing5Enabled' as const, priceKey: 'sharing5Price' as const },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-warm-primary mb-2">Add New Hostel</h1>
        <p className="text-muted-foreground">Fill in the details to list a new hostel in Hyderabad</p>
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
              <Select value={category} onValueChange={(value) => setCategory(value as HostelCategory)}>
                <SelectTrigger className="border-warm-border focus:ring-warm-primary">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Girls">Girls</SelectItem>
                  <SelectItem value="Boys">Boys</SelectItem>
                  <SelectItem value="Co-Living">Co-Living</SelectItem>
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
              <Label htmlFor="ownerContact">Owner Contact Number *</Label>
              <Input
                id="ownerContact"
                value={ownerContact}
                onChange={(e) => setOwnerContact(e.target.value)}
                placeholder="e.g., 9876543210"
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={latitude ?? ''}
                  onChange={(e) => setLatitude(e.target.value ? parseFloat(e.target.value) : null)}
                  placeholder="e.g., 17.3850"
                  className="border-warm-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={longitude ?? ''}
                  onChange={(e) => setLongitude(e.target.value ? parseFloat(e.target.value) : null)}
                  placeholder="e.g., 78.4867"
                  className="border-warm-border"
                />
              </div>
            </div>

            <MapLocationPicker onLocationSelect={handleLocationSelect} />
          </CardContent>
        </Card>

        {/* Gallery / Image URLs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-warm-primary" />
              Gallery Images
            </CardTitle>
            <CardDescription>Add image URLs for the hostel gallery (optional)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  value={url}
                  onChange={(e) => updateImageUrl(index, e.target.value)}
                  placeholder={`Image URL ${index + 1} (e.g., /assets/generated/hostel-room.png)`}
                  className="border-warm-border focus:ring-warm-primary flex-1"
                />
                {imageUrls.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeImageUrlField(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addImageUrlField}
              className="border-warm-border gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Another Image
            </Button>
          </CardContent>
        </Card>

        {/* Room Sharing Options */}
        <Card>
          <CardHeader>
            <CardTitle>Room Sharing & Pricing</CardTitle>
            <CardDescription>Select available room types and set prices per bed per month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sharingOptions.map((option) => (
                <div key={option.key} className="border border-warm-border rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={option.key}
                      checked={roomSharing[option.enabledKey]}
                      onCheckedChange={(checked) =>
                        setRoomSharing({ ...roomSharing, [option.enabledKey]: checked as boolean })
                      }
                    />
                    <Label htmlFor={option.key} className="font-semibold cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                  {roomSharing[option.enabledKey] && (
                    <div className="space-y-2">
                      <Label htmlFor={`${option.key}Price`} className="text-sm">
                        Price per bed (₹/month)
                      </Label>
                      <Input
                        id={`${option.key}Price`}
                        type="number"
                        min="0"
                        value={roomSharing[option.priceKey]}
                        onChange={(e) =>
                          setRoomSharing({ ...roomSharing, [option.priceKey]: e.target.value })
                        }
                        placeholder="Enter price in ₹"
                        className="border-warm-border"
                      />
                    </div>
                  )}
                </div>
              ))}
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
                  {validationErrors.map((err, index) => (
                    <li key={index}>{err}</li>
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
