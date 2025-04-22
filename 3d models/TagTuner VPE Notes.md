# VPE TagTuner stand
An alternative enclosure for the VPE and PN532 NFC reader.

I didn't want to completely disassemble the VPE, so I created this stand 
to allow plugging the grove connector into the VPE through the snap-off hole
in the bottom of the VPE.
## Files
- `TagTuner VPE Notes.md` - These Notes
- `TagTuner VPE.scad` - VPE + NFC reader OpenSCAD design
- `TagTuner VPE.stl` - VPE + NFC reader stand STL
- `TagTuner disc with B-XD002.stl` - Disc with cavity for NFC chip 
- `TagTuner disc.stl` - Disc without cavity

## OpenSCAD design
I used the BOSL2 OpenSCAD library as part of the design. 
https://github.com/BelfrySCAD/BOSL2/wiki

The file contains both the stand and a simple disc design that fits the stand.
To switch between them, you comment the appropriate line at the bottom of
the file.

The stand is made for a 100mm disc, but other sizes should sit there just
fine. The disc module takes a true/false parameter that enables a cavity in the
disc for a 25.4mm diameter x 1mm thick NFC chip (e.g. MakerWorld B-XD002). Or
you can disable the cavity and just use stick-on tags.

Many of the dimensions of the stand are parameterized such that relative
positions will adjust as needed. So it's relatively easy to adjust if  you
don't like my aesthetics.
 
## Slicing Notes
I enabled tree supports with "On build plate only" enabled. If you allow
supports within the object they will obstruct the internal channel for the NFC
reader wire and are very difficult to clean out.

I set max bridge size to 10mm. Using a 10mm bridge size permits the through 
holes for the VPE feet to be printed without supports. Supports here are 
difficult to clean up and are not needed.

I set the bridge direction manually, to 45 degrees. The default attempted 
to create a diving board 50mm long with no support at one end over the 
channel that the NFC reader wire runs through. There will be some amount 
of stringing where the VPE base and the reader plate intersect, but it's 
all internal and not visible.

When slicing the disc, I used the Archimedian Chords surface pattern for top
and bottom (gives a vinyl record-like appearance). If embedding an NFC chip
in a cavity, you will need to set a pause point at the layer just prior to
covering the cavity.

## Assembly
Run the grove cable from the back of the NFC reader plate down through the 
channel and into the VPE base. Some jiggering is required to coax it through 
the channel, but it will go.

Attach one end of the grove to the NFC reader then slide the reader into
the slot in the cavity on the back of the reader plate (with grove connector
down and bottom side of reader toward the face of the plate). I would
wait to snap in the back cover plate till everything is tested. It can be 
difficult to remove.

Snap off the plastic tab that covers the grove connector on the bottom of
the VPE. Plug the grove connector into the bottom of the VPE. Snake the
excess cable in the recessed area and set the VPE into the base.

Optionally, you may remove the rubber feet and bolts in the bottom of the 
VPE and screw the VPE down to the base. You will require 4 M3x16 bolts for
this. The rubber feet can be reused in the bottom of the base.
