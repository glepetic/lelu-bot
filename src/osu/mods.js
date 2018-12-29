const Mods = {
    None : 0,
    NF : 1,
    EZ : 2,
    NoVideo : 4,
    HD : 8,
    HR : 16,
    SD : 32,
    DT : 64,
    Relax : 128,
    HT : 256,
    NC : 512, //only shows with DT 512 + 54 = 576
    FL : 1024,
    Autoplay : 2048,
    SpunOut : 4096,
    Autopilot : 8192,
    PF : 16384, // only shows with SD 16384 + 32 = 16416
    Key4 : 32768,
    Key5 : 65536,
    Key6 : 131072,
    Key7: 262144,
    Key8: 524288,
    FadeIn: 1048576,
    Random: 2097152,
    LastMod: 4194304,
    Key9: 16777216,
    Key10: 33554432,
    Key1: 67108864,
    Key3: 134217728,
    Key2: 268435456

}

Mods.keyMod = Mods.Key4 | Mods.Key5 | Mods.Key6 | Mods.Key7 | Mods.Key8;
Mods.FreeModAllowed = Mods.NF | Mods.EZ | Mods.HD | Mods.HR | Mods.SD | Mods.FL | Mods.FadeIn | Mods.Relax | Mods.Autopilot | Mods.SpunOut | Mods.keyMod;

module.exports = Mods;