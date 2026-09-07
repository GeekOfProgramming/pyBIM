import { 
  Server, 
  Cpu, 
  KeyRound, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Lock, 
  HardDrive, 
  Network,
  CheckCircle2,
  Clock
} from "lucide-react";

export default function InfrastructurePage() {
  const gpuNodes = [
    {
      id: "GPU-VPS-EU-01",
      location: "Frankfurt DC-02 (Private VPC)",
      gpu: "NVIDIA A100 Tensor Core 80GB SXM4",
      cpu: "AMD EPYC 7763 64-Core Processor",
      ram: "256 GB ECC DDR4",
      ip: "10.240.10.14 (Internal Air-Gap Route)",
      status: "OPERATIONAL",
      load: "42% Compute / 18.4 GB VRAM",
      uptime: "99.98% (48 days)"
    },
    {
      id: "GPU-VPS-EU-02",
      location: "Milan Equinix ML2 (Dedicated Cluster)",
      gpu: "NVIDIA A100 Tensor Core 80GB SXM4",
      cpu: "AMD EPYC 7763 64-Core Processor",
      ram: "256 GB ECC DDR4",
      ip: "10.240.10.15 (Internal Air-Gap Route)",
      status: "OPERATIONAL",
      load: "12% Compute / 6.2 GB VRAM",
      uptime: "100.0% (112 days)"
    }
  ];

  const edgeAppliances = [
    {
      name: "EDGE-APPLIANCE-PADUA-01",
      site: "University of Padua Engineering R&D Center",
      role: "Headless IFC Compilation & Geometry Kernel",
      firmware: "v2.4.11-airgap",
      cryptoModule: "Hardware TPM 2.0 / AES-NI Active",
      heartbeat: "2 seconds ago",
      latency: "1.2ms (Direct Fiber Interconnect)",
      state: "SYNCED"
    },
    {
      name: "EDGE-APPLIANCE-PADUA-02",
      site: "Consortium Secondary Engineering Vault",
      role: "Parametric Clash Detection & Topology Daemon",
      firmware: "v2.4.11-airgap",
      cryptoModule: "Hardware TPM 2.0 / ChaCha20-Poly1305",
      heartbeat: "4 seconds ago",
      latency: "2.4ms (Dedicated Tunnel)",
      state: "SYNCED"
    }
  ];

  const licenseKeys = [
    {
      keyId: "LIC-ENT-2026-9942-PADUA",
      tier: "Enterprise Air-Gapped Core",
      signingAuthority: "Padua Information Engineering Cryptographic CA",
      issuedTo: "Padua Engineering Consortium & Strategic Partners",
      nodesAuthorized: "Unlimited Headless Computational Nodes",
      validThrough: "December 31, 2027",
      status: "ACTIVE & VALIDATED",
      hash: "e7c2f81a4b9e28d6c70129f123490bca876129845efca0921789b"
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1.5">
            <Server className="w-3.5 h-3.5" />
            <span>// HARDWARE_TOPOLOGY_&_LICENSING</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Infrastructure & Licenses</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Read-only hardware manifest of dedicated GPU-VPS nodes, on-premise edge appliances, and cryptographic enterprise licenses.
          </p>
        </div>

        <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#0f1115] border border-neutral-800 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-neutral-400">ISOLATION: </span>
          <span className="text-emerald-400 font-semibold">AIR-GAP VERIFIED</span>
        </div>
      </div>

      {/* Section 1: GPU-VPS Compute Nodes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              1. Dedicated GPU-VPS Allocations
            </h2>
          </div>
          <span className="text-[11px] font-mono text-neutral-500">2 NODES PROVISIONED</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {gpuNodes.map((node) => (
            <div 
              key={node.id} 
              className="p-5 rounded-xl bg-[#0f1115] border border-neutral-800 hover:border-neutral-700 transition-colors space-y-4 font-mono text-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{node.id}</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">{node.location}</div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {node.status}
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-800/80 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">ACCELERATOR:</span>
                  <span className="text-purple-300 font-semibold">{node.gpu}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">CPU INSTANCE:</span>
                  <span className="text-neutral-300">{node.cpu}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">HOST MEMORY:</span>
                  <span className="text-neutral-300">{node.ram}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">INTERNAL IP:</span>
                  <span className="text-neutral-400">{node.ip}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#09090b] border border-neutral-900 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-neutral-400">Current Load:</span>
                  <span className="text-white font-medium">{node.load}</span>
                </div>
                <span className="text-neutral-500">{node.uptime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: On-Premise Edge Appliances */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              2. On-Premise Edge Appliances (Padua Infrastructure)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-neutral-500">2 PHYSICAL APPLIANCES</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {edgeAppliances.map((appliance) => (
            <div 
              key={appliance.name} 
              className="p-5 rounded-xl bg-[#0f1115] border border-neutral-800 space-y-4 font-mono text-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{appliance.name}</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">{appliance.site}</div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-purple-400" />
                  {appliance.state}
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-800/80 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">ROLE:</span>
                  <span className="text-neutral-300 font-sans font-medium">{appliance.role}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">FIRMWARE:</span>
                  <span className="text-neutral-300">{appliance.firmware}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">SECURITY MODULE:</span>
                  <span className="text-emerald-400">{appliance.cryptoModule}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">HEARTBEAT:</span>
                  <span className="text-neutral-400">{appliance.heartbeat} ({appliance.latency})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Active Enterprise License Keys */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              3. Cryptographic License Manifest
            </h2>
          </div>
          <span className="text-[11px] font-mono text-emerald-400">CRYPTOGRAPHICALLY SIGNED</span>
        </div>

        {licenseKeys.map((lic) => (
          <div 
            key={lic.keyId}
            className="p-6 rounded-xl bg-[#0f1115] border border-neutral-800 space-y-4 font-mono"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800">
              <div>
                <div className="text-xs text-neutral-500">LICENSE KEY IDENTIFIER</div>
                <div className="text-base font-bold text-purple-400 tracking-wider mt-0.5">{lic.keyId}</div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold self-start sm:self-auto">
                <Lock className="w-3.5 h-3.5" />
                {lic.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <div className="text-neutral-500 text-[11px]">SUBSCRIPTION TIER</div>
                <div className="text-white font-medium mt-1 font-sans">{lic.tier}</div>
              </div>
              <div>
                <div className="text-neutral-500 text-[11px]">ISSUING AUTHORITY</div>
                <div className="text-white font-medium mt-1 font-sans">{lic.signingAuthority}</div>
              </div>
              <div>
                <div className="text-neutral-500 text-[11px]">VALID THROUGH</div>
                <div className="text-white font-medium mt-1">{lic.validThrough}</div>
              </div>
              <div>
                <div className="text-neutral-500 text-[11px]">AUTHORIZED WORKLOAD</div>
                <div className="text-white font-medium mt-1">{lic.nodesAuthorized}</div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-neutral-500 text-[11px]">SIGNING SHA-256 DIGEST</div>
                <div className="text-neutral-400 text-[11px] mt-1 break-all bg-[#09090b] p-2 rounded border border-neutral-900">
                  {lic.hash}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Read-Only Invariant Notice */}
      <div className="p-4 rounded-xl bg-[#0c0d11] border border-neutral-800/80 text-xs text-neutral-400 flex items-start gap-3">
        <Lock className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
        <div>
          <span className="text-white font-semibold font-mono">INFRASTRUCTURE GOVERNANCE:</span>{" "}
          Allocation adjustments, new node provisioning, and key renewals are processed exclusively via offline signed manifests and bilateral enterprise service agreements.
        </div>
      </div>

    </div>
  );
}
