import { Vec3 } from "../utils/vec3.js";
import { RADIAN } from "../constants/MathConstants.js";
import { DimensionTypes, world } from "../types/World.js";
import { BlockLocation } from "../types/BlockLocation.js";
import { _MinecraftBlockTypes } from "../types/Exports.js";
import { BlockPermutation } from "../types/BlockPermutation.js";
export class Material {
    namespace: string;
    vertexShader: VertexShader;
    fragmentShader: FragmentShader;
    constructor(
        namespace: string,
        vertexShader: VertexShader,
        fragmentShader: FragmentShader
    ) {
        this.namespace = namespace;
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
    }
    apply(vertexArgs: Map<string, any>, fragmentArgs: Map<string, any>): void {
        let blockLoc = this.vertexShader.execute(vertexArgs)
        fragmentArgs.set("location", blockLoc);
        let blockPerm = this.fragmentShader.execute(fragmentArgs);
        for (let i = 0; i < blockLoc.length; i++) {
            world.getDimension(DimensionTypes.overworld).getBlock(blockLoc[i]).setPermutation(blockPerm[i]);
        }
    }
    toString() {
        return this.namespace;
    }
}
export class Shader {
    namespace: string;
    constructor(namespace: string) {
        this.namespace = namespace;
    }
    execute(args: Map<string, any>): any {
        return;
    }
}
export class VertexShader extends Shader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): BlockLocation[] {
        return;
    }
}
export class FragmentShader extends Shader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): BlockPermutation[] {
        return;
    }
}
export class PointVertex extends VertexShader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): BlockLocation[] {
        let pt1: Vec3 = args.get("position");
        return [new BlockLocation(pt1.x, pt1.y, pt1.z)];
    }
}
export class CuboidVertex extends VertexShader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): BlockLocation[] {
        let pt1: Vec3 = args.get("start");
        let pt2: Vec3 = args.get("end");
        let ret: BlockLocation[] = [];
        for (let x = pt1.x; x <= pt2.x; x++) {
            for (let y = pt1.y; y <= pt2.y; y++) {
                for (let z = pt1.z; z <= pt2.z; z++) {
                    ret.push(new BlockLocation(x, y, z));
                }
            }
        }
        return ret;
    }
}
export class LineVertex extends VertexShader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): BlockLocation[] {
        let pt1: Vec3 = args.get("pt1");
        let pt2: Vec3 = args.get("pt2");
        let x, y, z;
        let ret: BlockLocation[] = [];
        let pt3 = pt2.clone().subtract(pt1);
        if (
            Math.max(Math.abs(pt3.x), Math.abs(pt3.y), Math.abs(pt3.z)) ==
            Math.abs(pt3.x)
        ) {
            for (
                x = pt1.x;
                pt1.x < pt2.x ? x <= pt2.x : x >= pt2.x;
                pt1.x < pt2.x ? x++ : x--
            ) {
                y = Math.round(((x - pt1.x) / pt3.x) * pt3.y + pt1.y);
                z = Math.round(((x - pt1.x) / pt3.x) * pt3.z + pt1.z);
                ret.push(new BlockLocation(x, y, z));
            }
        } else if (
            Math.max(Math.abs(pt3.x), Math.abs(pt3.y), Math.abs(pt3.z)) ==
            Math.abs(pt3.y)
        ) {
            for (
                y = pt1.y;
                pt1.y < pt2.y ? y <= pt2.y : y >= pt2.y;
                pt1.y < pt2.y ? y++ : y--
            ) {
                x = Math.round(((y - pt1.y) / pt3.y) * pt3.x + pt1.x);
                z = Math.round(((y - pt1.y) / pt3.y) * pt3.z + pt1.z);
                ret.push(new BlockLocation(x, y, z));
            }
        } else {
            for (
                z = pt1.z;
                pt1.z < pt2.z ? z <= pt2.z : z >= pt2.z;
                pt1.z < pt2.z ? z++ : z--
            ) {
                y = Math.round(((z - pt1.z) / pt3.z) * pt3.y + pt1.y);
                x = Math.round(((z - pt1.z) / pt3.z) * pt3.x + pt1.x);
                ret.push(new BlockLocation(x, y, z));
            }
        }
        return ret;
    }
}
export class CircleVertex extends VertexShader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): BlockLocation[] {
        let pt1: Vec3 = args.get("pt1");
        let radius: number = args.get("radius");
        let ret: BlockLocation[] = [];
        const step = 360 / (Math.PI * radius * 64);
        for (let i = 0; i < Math.ceil(Math.PI * radius * 64); i++) {
            ret.push(
                new BlockLocation(
                    pt1.x + Math.round(radius * Math.sin(step * i * RADIAN)),
                    pt1.y,
                    pt1.z + Math.round(radius * Math.cos(step * i * RADIAN))
                )
            );
        }
        return ret;
    }
}
export class SphereVertex extends VertexShader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): BlockLocation[] {
        let pt1: Vec3 = args.get("pt1");
        let radius: number = args.get("radius");
        let precision: number = args.get("precision");
        let ret: BlockLocation[] = [];
        const step = 360 / (Math.PI * radius * precision);
        for (let i = 0; i <= Math.ceil((Math.PI * radius * precision) / 4); i++) {
            for (let j = 0; j <= Math.ceil((Math.PI * radius * precision) / 4); j++) {
                let x = Math.round(
                    radius * Math.cos(step * i * RADIAN) * Math.sin(step * j * RADIAN)
                );
                let y = Math.round(
                    radius * Math.sin(step * i * RADIAN) * Math.sin(step * j * RADIAN)
                );
                let z = Math.round(radius * Math.cos(step * j * RADIAN));
                ret.push(new BlockLocation(pt1.x + x, pt1.y + y, pt1.z + z));
                ret.push(new BlockLocation(pt1.x - x, pt1.y + y, pt1.z + z));
                ret.push(new BlockLocation(pt1.x + x, pt1.y - y, pt1.z + z));
                ret.push(new BlockLocation(pt1.x + x, pt1.y + y, pt1.z - z));
                ret.push(new BlockLocation(pt1.x - x, pt1.y - y, pt1.z + z));
                ret.push(new BlockLocation(pt1.x + x, pt1.y - y, pt1.z - z));
                ret.push(new BlockLocation(pt1.x - x, pt1.y + y, pt1.z - z));
                ret.push(new BlockLocation(pt1.x - x, pt1.y - y, pt1.z - z));
            }
        }
        return ret;
    }
}
export class BaseFragment extends Shader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): BlockPermutation[] {
        let ret: BlockPermutation[] = [];
        let vertex: BlockLocation[] = args.get("location");
        let block: string = args.get("block");
        for (let i of vertex) {
            let blockData: BlockPermutation = (
                _MinecraftBlockTypes[block as keyof typeof _MinecraftBlockTypes] as any
            ).createDefaultBlockPermutation();
            ret.push(blockData);
        }
        return ret;
    }
}
export class UnweightedBlockDistFragment extends Shader {
    constructor(namespace: string) {
        super(namespace);
    }
    execute(args: Map<string, any>): BlockPermutation[] {
        let ret: BlockPermutation[] = [];
        let vertex: BlockLocation[] = args.get("location");
        let block: string[] = args.get("blocks");
        for (let i of vertex) {
            let blockData: BlockPermutation = (
                _MinecraftBlockTypes[block[Math.floor(Math.random() * (block.length))] as keyof typeof _MinecraftBlockTypes] as any
            ).createDefaultBlockPermutation();
            ret.push(blockData);
        }
        return ret;
    }
}

export let pointMaterial: Material = new Material("point", new PointVertex("point_vertex"), new BaseFragment("point_fragment"));
export let cuboidMaterial: Material = new Material("cuboid", new CuboidVertex("cuboid_vertex"), new BaseFragment("cuboid_fragment"));
export let testMaterial: Material = new Material("cuboid", new CuboidVertex("cuboid_vertex"), new UnweightedBlockDistFragment("cuboid_fragment"));