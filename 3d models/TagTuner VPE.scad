include <BOSL2/std.scad>

$fa=2;
$fs=0.5;

FACE=1;
POCKET=2;
FULL=3;

module arc(r1, r2, a1, a2) {
  difference() {
    difference() {
      polygon([[0,0], [cos(a1) * (r1 + 50), sin(a1) * (r1 + 50)], [cos(a2) * (r1 + 50), sin(a2) * (r1 + 50)]]);
      circle(r = r2);
    }
    difference() {
      circle(r=r1 + 100);
      circle(r=r1);
    }
  }
}

module snap_lock(snapdiam=5, snaplen=5, baseheight=2) {
    slop = 0.2;
    bh = baseheight + slop;
    
    translate([0,0,-slop]) {
        cuboid([snaplen, snapdiam, snapdiam + bh], rounding=snapdiam/2,
                edges=[TOP+FRONT, TOP+BACK], anchor=BOT);
        translate([-snaplen / 2 + snapdiam / 24, 0, bh + snapdiam / 2])
            xscale(0.333) sphere(d=snapdiam * 0.8);
        translate([snaplen / 2 - snapdiam / 24, 0, bh + snapdiam / 2])
            xscale(0.333) sphere(d=snapdiam * 0.8);
    }
}

module snap_socket(snapdiam=5, snaplen=5, baseheight=2) {
    slop = 0.2;
    bh = baseheight + slop;
    
    translate([-snaplen - slop / 2, 0, -slop]) {
        difference() {
            cuboid([snaplen - slop, snapdiam, snapdiam + bh], rounding=snapdiam/2,
                    edges=[TOP+FRONT, TOP+BACK], anchor=BOT);
            translate([snaplen / 2 + snapdiam / 24, 0, bh + snapdiam / 2])
                xscale(0.333) sphere(d=snapdiam * 0.8);
        }
    }

    translate([snaplen + slop / 2, 0, -slop]) {
        difference() {
            cuboid([snaplen - slop, snapdiam, snapdiam + bh], rounding=snapdiam/2,
                    edges=[TOP+FRONT, TOP+BACK], anchor=BOT);
            translate([-snaplen / 2 + snapdiam / 24, 0, bh + snapdiam / 2])
                xscale(0.333) sphere(d=snapdiam * 0.8);
        }
    }
}

tag_reader_height   = 43;
tag_reader_width    = 42;
access_tab_width    = 10;
access_tab_height   = 20;
snap_dia            = 8;
snap_base           = 0;
snap_height         = snap_dia + snap_base;
access_width        = tag_reader_width+1;
access_height       = tag_reader_height+1;
access_plate_depth  = 2;
access_tab_depth    = snap_height + access_plate_depth;
disc_dia            = 100;
disc_thick          = 3;

module tag_disc(b_xd002=false) {
    disc_round      = disc_thick / 2;
    b_xd002_thick   = 1;    // pocket for embedded NFC tag
    b_xd002_dia     = 25.4;
    

    difference() {
        cyl(l=disc_thick, d=disc_dia, rounding=disc_round, anchor=BOT);
        if (b_xd002) {
            translate([0, 0, disc_thick / 2])
                cyl(l=b_xd002_thick + 0.2, d=b_xd002_dia, anchor=CENTER);
        }
    }
}

// tag plate access cover
module access_plate() {
    slop = 0.4;
    translate([100, 0, 0]) {
        cube([access_width - slop, access_height - slop, access_plate_depth], anchor=BOT+FRONT+LEFT);
        translate([0, access_height / 2 - slop / 2, 0])
            cube([access_tab_width, access_tab_height - slop, access_plate_depth], anchor=BOT+RIGHT);
        translate([access_width - slop, access_height / 2 - slop / 2, 0])
            cube([access_tab_width, access_tab_height - slop, access_plate_depth], anchor=BOT+LEFT);
        translate([-snap_dia / 2 - slop / 2, access_height / 2, access_plate_depth])
            rotate([0,0,90])
            snap_socket(snapdiam=snap_dia, baseheight=snap_base);
        translate([access_width + snap_dia / 2 + slop / 2, access_height / 2, access_plate_depth])
            rotate([0,0,90])
            snap_socket(snapdiam=snap_dia, baseheight=snap_base);
    }
}

module tag_stand(show=FULL) {
    vpe_width           = 83.2; // VPE width/height
    vpe_embed_depth     = 7;
    vpe_grove_depth     = 5;
    foot_outer_depth    = 1.5;
    foot_inner_depth    = 5;
    vpe_base_height     = foot_outer_depth + foot_inner_depth + vpe_embed_depth + 2;
    vpe_base_dia        = sqrt(2 * vpe_width ^ 2) + 10;
    tag_pocket_depth    = 12;   // depth of tag reader
    tag_plate_depth     = tag_pocket_depth + 4;

    module tag_plate(show=FULL) {
        tag_plate_dia       = 80;   // must be large enough to contain tag reader
        tag_pocket_z_offset = 2;    // reader distance from front face
        tag_pocket_y_offset = 10;   // margin above and below interior void for reader
        tag_slot_depth      = 2;    // slot depth for reader PCB edge slide
        tag_lip_depth       = 6;    // How much the lip protrudes from the face
        tag_lip_thick       = 5;    // How sturdy is the lip

        tag_pocket_width        = tag_reader_width - 4;
        tag_pocket_height       = tag_reader_height;
        tag_access_depth        = tag_plate_depth - tag_pocket_z_offset;
        tag_slot_width          = tag_reader_width;
        tag_slot_offset         = tag_pocket_z_offset + tag_slot_depth;
        tag_lip_dia             = disc_dia;
        tag_lip_outer_dia       = disc_dia + tag_lip_thick * 2;
        tag_lip_groove_width    = disc_thick + 0.2;
        tag_lip_groove_depth    = 1;
        tag_lip_groove_offset   = 1;

        module faces() {
            cyl(l=tag_plate_depth, d=tag_plate_dia, rounding=2, anchor=BOT+FRONT);
            difference() {
                translate([0, tag_lip_outer_dia / 2, tag_plate_depth - 2])
                          linear_extrude(height = tag_lip_depth + 2)
                              arc(r1=tag_lip_outer_dia/2, r2=tag_lip_dia/2, a1=225, a2=315);
                translate([0, tag_lip_outer_dia / 2, tag_plate_depth + tag_lip_groove_offset])
                          linear_extrude(height = tag_lip_groove_width)
                              arc(r1=tag_lip_dia/2 + tag_lip_groove_depth, r2=tag_lip_dia/2 - 0.1, 
                                  a1 = 224, a2 = 316);
            }
        }
        module pockets() {
            // tag reader wire via
            translate([0, -0.1, tag_plate_depth - tag_pocket_depth - tag_pocket_z_offset])
                ycyl(l=tag_pocket_height, d=tag_plate_depth - 4, anchor=BOT+FRONT);
            // tag reader pocket
            translate([0, tag_pocket_y_offset, 
                      tag_plate_depth - tag_pocket_depth - tag_pocket_z_offset])
                cube([tag_pocket_width, tag_pocket_height, tag_pocket_depth], anchor=BOT+FRONT);
            // tag reader retainer slot
            translate([0, tag_pocket_y_offset, tag_plate_depth - tag_slot_depth - tag_slot_offset])
                cube([tag_slot_width, tag_pocket_height, tag_slot_depth], anchor=BOT+FRONT);
            // tag reader access hole
            translate([0, tag_plate_dia - tag_pocket_y_offset - access_height, -0.1])
                cube([access_width+0.2, access_height+0.2, tag_access_depth+0.1], anchor=BOT+FRONT);
        }
        module access_tab_hole() {
            // tag plate snap holes
            translate([-access_width / 2, 
                      tag_plate_dia - tag_pocket_y_offset - access_height / 2, -0.1])
                cube([access_tab_width+0.2, access_tab_height, access_tab_depth + 0.1], anchor=BOT+RIGHT);
            translate([access_width / 2, 
                      tag_plate_dia - tag_pocket_y_offset - access_height / 2, -0.1])
                cube([access_tab_width+0.2, access_tab_height, access_tab_depth + 0.1], anchor=BOT+LEFT);
        }

        module snaps() {
            translate([-access_width / 2 - 4, tag_plate_dia - tag_pocket_y_offset - access_height / 2, 
                      access_tab_depth])
                rotate([180, 0, 90])
                snap_lock(snapdiam=snap_dia, baseheight=snap_base);
            translate([access_width / 2 + 4, tag_plate_dia - tag_pocket_y_offset - access_height / 2, 
                      access_tab_depth])
                rotate([180, 0, 90])
                snap_lock(snapdiam=snap_dia, baseheight=snap_base);
        }
        translate([0, 0, -tag_plate_depth / 2]) {
            if (show == FULL) {
                difference() {
                    faces();
                    access_tab_hole();
                    pockets();
                }
                snaps();
            } else if (show == FACE) {
                difference() 
                {
                    faces();
                    access_tab_hole();
                }
                snaps();
            } else if (show == POCKET) {
                pockets();
            }
        }
    }

    // circular base for VCE
    module vpe_base(show=FULL) {
        foot_inner_dia      = 6.25;
        foot_outer_dia      = 9.25;
        foot_bolt_dia       = 3.2;
        foot_center         = 9;
        vpe_foot_clearance  = 15;
        vpe_embed_depth     = 7;
        vpe_grove_y         = (vpe_width - vpe_foot_clearance * 2) / 2;
        tag_plate_via_off_y = 4.1;
        tag_plate_via_off_x = 3.6;

        vpe_grove_width     = tag_plate_depth - 4;
        vpe_grove_x         = vpe_width / 2 - vpe_foot_clearance - vpe_grove_width;
        vpe_grove_length    = vpe_base_dia / 2 - vpe_grove_y - tag_plate_via_off_y;
        channel_height      = vpe_embed_depth + vpe_grove_depth - 2;
        
        module faces() {
            rotate([0,0,135]) 
                teardrop(d=vpe_base_dia, h=vpe_base_height, ang=45, chamfer2=3,
                         anchor=FRONT, orient=FRONT);
        }
        module pockets() {
            // VPE cutout
            translate([0, 0, vpe_base_height - vpe_embed_depth]) 
                cuboid([vpe_width, vpe_width, vpe_embed_depth + 0.1], 
                       rounding=7, edges=["Z"], anchor=BOT);

            // grove wire pocket
            translate([0, 0, vpe_base_height - vpe_embed_depth - vpe_grove_depth]) 
                cuboid([vpe_width, vpe_width - vpe_foot_clearance * 2, vpe_grove_depth + 0.1], 
                       rounding=7, edges=["Z"], anchor=BOT);

            // VPE grove connecter wire channel
            translate([0, vpe_grove_y - 0.1, 
                      vpe_base_height - vpe_embed_depth - vpe_grove_depth])
                cuboid([vpe_grove_width, vpe_grove_length + 0.1, channel_height], 
                       rounding=6, edges=[BACK+LEFT], anchor=BOTTOM+LEFT+FRONT);

            // VPE grove connecter wire channel bend
            translate([vpe_grove_width -0.1, vpe_base_dia / 2 - vpe_grove_width - tag_plate_via_off_y,
                      vpe_base_height - vpe_embed_depth - vpe_grove_depth])
                cuboid([vpe_base_dia / 2 - 2 - vpe_grove_width - tag_plate_via_off_x, 
                       vpe_grove_width, channel_height], rounding=6, 
                       edges=[BACK+RIGHT,FRONT+RIGHT,BOTTOM+RIGHT], anchor=BOTTOM+LEFT+FRONT);

            // VPE speaker cutout
            translate([0,-vpe_width / 2, vpe_base_height - vpe_embed_depth])
                xcyl(l=30, r=vpe_embed_depth, rounding=vpe_embed_depth, anchor=BOT);
                
            // Bolt holes
            translate([vpe_width / 2 - foot_center, vpe_width / 2 - foot_center, -0.1]) {
                zcyl(l=foot_outer_depth + 0.1, d=foot_outer_dia, anchor=BOT);
                translate([0, 0, foot_outer_depth])
                    zcyl(l=foot_inner_depth + 0.1, d=foot_inner_dia, anchor=BOT);
                translate([0, 0, foot_outer_depth + foot_inner_depth])
                    zcyl(l=2.2, d=foot_bolt_dia, anchor=BOT);
            }
            translate([vpe_width / 2 - foot_center, -(vpe_width / 2 - foot_center),  -0.1]) {
                zcyl(l=foot_outer_depth + 0.1, d=foot_outer_dia, anchor=BOT);
                translate([0, 0, foot_outer_depth])
                    zcyl(l=foot_inner_depth + 0.1, d=foot_inner_dia, anchor=BOT);
                translate([0, 0, foot_outer_depth + foot_inner_depth])
                    zcyl(l=2.2, d=foot_bolt_dia, anchor=BOT);
            }
            translate([-(vpe_width / 2 - foot_center), vpe_width / 2 - foot_center,  -0.1]) {
                zcyl(l=foot_outer_depth + 0.1, d=foot_outer_dia, anchor=BOT);
                translate([0, 0, foot_outer_depth])
                    zcyl(l=foot_inner_depth + 0.1, d=foot_inner_dia, anchor=BOT);
                translate([0, 0, foot_outer_depth + foot_inner_depth])
                    zcyl(l=2.2, d=foot_bolt_dia, anchor=BOT);
            }
            translate([-(vpe_width / 2 - foot_center), -(vpe_width / 2 - foot_center),  -0.1]) {
                zcyl(l=foot_outer_depth + 0.1, d=foot_outer_dia, anchor=BOT);
                translate([0, 0, foot_outer_depth])
                    zcyl(l=foot_inner_depth + 0.1, d=foot_inner_dia, anchor=BOT);
                translate([0, 0, foot_outer_depth + foot_inner_depth])
                    zcyl(l=2.2, d=foot_bolt_dia, anchor=BOT);
            }
        }
        if (show == FULL) {
            difference() {
                faces();
                pockets();
            }
        } else if (show == FACE) {
            faces();
        } else if (show == POCKET) {
            pockets();
        }
    }

    module assemble() {
        stand_x             = vpe_base_dia / 2 - 12;
        stand_y             = vpe_base_dia / 2 - 11;
        stand_z             = vpe_base_height - 4;
        plate_tilt_angle    = 75;
        plate_face_angle    = -20;

        vpe_base(show);
        translate([stand_x, stand_y, stand_z])
            rotate([plate_tilt_angle, 0, plate_face_angle])
                tag_plate(show);
    }
    
    module test() {
        translate([0, 100, 0])
            tag_plate(show);
        vpe_base(show);
    }
    assemble();
    //test();
}

module tag_tuner() {
    // Put it all together
    difference() {
        tag_stand(FACE);
        tag_stand(POCKET);
    }
    access_plate();
}

//tag_disc(true);
tag_tuner();
