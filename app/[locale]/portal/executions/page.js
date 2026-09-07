"use client";

import { useState } from "react";
import { 
  TerminalSquare, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Cpu, 
  ChevronRight, 
  Filter, 
  RefreshCw,
  Search,
  Code2,
  Database,
  ExternalLink
} from "lucide-react";

export default function ExecutionsPage() {
  const [filter, setFilter] = useState("ALL");
  const [selectedRun, setSelectedRun] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const executions = [
    {
      id: "EXEC-9942",
      pipeline: "IFC4x3 Structural Mesh Extraction",
      node: "gpu-vps-eu-01 (NVIDIA A100)",
      duration: "14.2s",
      memory: "18.4 GB",
      status: "RUNNING",
      timestamp: "2026-09-07 15:10:04 UTC",
      elementsProcessed: 142050,
      logs: [
        "[15:10:04] INIT_KERNEL: Allocating CUDA stream on node gpu-vps-eu-01",
        "[15:10:05] SCHEMA_PARSER: Loading ISO 16739-1:2018 (IFC4x3_ADD2)",
        "[15:10:07] GEOM_RESOLVER: Tessellating 142,050 spatial elements into boundary representation",
        "[15:10:11] MESH_KERN: Vertex deduplication buffer active. 3.4M triangles computed",
        "[15:10:14] STREAM_STDOUT: Streaming binary geometry buffers to private IPC socket...",
      ]
    },
    {
      id: "EXEC-9941",
      pipeline: "Revit Parameter Sync Daemon",
      node: "edge-node-pd-01 (Headless Air-Gap)",
      duration: "4.8s",
      memory: "3.2 GB",
      status: "COMPLETED",
      timestamp: "2026-09-07 14:55:18 UTC",
      elementsProcessed: 48920,
      logs: [
        "[14:55:18] DAEMON_START: Scanning shared project storage for delta changes",
        "[14:55:19] DIFF_ENGINE: Identified 1,280 modified shared parameter bindings",
        "[14:55:21] CIPHER_COMM: Writing deterministic updates to local SQLite shadow vault",
        "[14:55:22] VERIFY_SIGN: SHA-256 signature verified by Padua On-Premise appliance",
        "[14:55:22] STATUS_OK: Pipeline finished with zero collisions."
      ]
    },
    {
      id: "EXEC-9940",
      pipeline: "Air-Gapped Clash Matrix Generator",
      node: "gpu-vps-eu-02 (NVIDIA A100)",
      duration: "1m 12s",
      memory: "34.1 GB",
      status: "COMPLETED",
      timestamp: "2026-09-07 14:12:00 UTC",
      elementsProcessed: 684120,
      logs: [
        "[14:12:00] MATRIX_BOOT: Loading spatial octree into High Bandwidth Memory (HBM2e)",
        "[14:12:15] CLASH_SWEEP: Sweeping 684,120 solid primitives across MEP vs Structural zones",
        "[14:12:48] BVH_TRAVERSAL: Filtered out 99.8% non-intersecting AABB bounding boxes",
        "[14:13:08] RESULT_EMIT: Detected 14 hard geometric clashes. Categorized by MEP trade",
        "[14:13:12] AUDIT_CLOSE: Cryptographic report generated. Export locked."
      ]
    },
    {
      id: "EXEC-9939",
      pipeline: "Topology Optimization Kernel (C++ Core)",
      node: "edge-node-pd-02 (Headless Air-Gap)",
      duration: "4m 45s",
      memory: "61.0 GB",
      status: "COMPLETED",
      timestamp: "2026-09-07 12:40:22 UTC",
      elementsProcessed: 1200000,
      logs: [
        "[12:40:22] KERNEL_INIT: SIMD AVX-512 acceleration enabled",
        "[12:41:05] FEM_SOLVER: Solving linear elasticity equations for 1.2M tetrahedral elements",
        "[12:43:10] COMPLIANCE_OPT: Iteration 42/50. Objective strain energy converged (delta < 1e-6)",
        "[12:45:07] POST_SMOOTH: Laplacian volume smoothing finished. Exported to step manifest."
      ]
    },
    {
      id: "EXEC-9938",
      pipeline: "Automated COBie Metadata Compiler",
      node: "edge-node-pd-01 (Headless Air-Gap)",
      duration: "18.2s",
      memory: "5.4 GB",
      status: "FAILED",
      timestamp: "2026-09-07 10:15:33 UTC",
      elementsProcessed: 12400,
      logs: [
        "[10:15:33] METADATA_INGEST: Reading project facility asset dictionary",
        "[10:15:42] SCHEMA_CHECK: Validation failure at Type 'OmniClass_Table_23'",
        "[10:15:51] ERR_ABORT: Missing mandatory asset classification on 42 mechanical components",
        "[10:15:51] HALT: Process aborted with exit code 141 (SCHEMA_INTEGRITY_VIOLATION)"
      ]
    },
    {
      id: "EXEC-9937",
      pipeline: "Georeferenced Point Cloud Decimator",
      node: "gpu-vps-eu-01 (NVIDIA A100)",
      duration: "58.4s",
      memory: "42.8 GB",
      status: "COMPLETED",
      timestamp: "2026-09-07 08:30:11 UTC",
      elementsProcessed: 28400000,
      logs: [
        "[08:30:11] LAS_READER: Ingesting 28.4M terrestrial lidar points from internal SAS volume",
        "[08:30:25] VOXEL_GRID: Grid decimation at 5mm spacing initialized",
        "[08:30:52] NORMAL_ESTIMATE: Estimating planar surface normals via PCA",
        "[08:31:09] FLUSH: Point density normalized. Process completed."
      ]
    }
  ];

  const filtered = executions.filter(item => {
    if (filter !== "ALL" && item.status !== filter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.id.toLowerCase().includes(q) ||
        item.pipeline.toLowerCase().includes(q) ||
        item.node.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1.5">
            <TerminalSquare className="w-3.5 h-3.5" />
            <span>// DETERMINISTIC_PIPELINE_RUNS</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Algorithmic Executions</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Read-only audit stream tracking headless CAD/BIM computational pipelines, GPU kernels, and air-gap node execution.
          </p>
        </div>

        {/* Global Pipeline Health Status Badge */}
        <div className="flex items-center gap-3 self-start md:self-auto px-4 py-2.5 rounded-xl bg-[#0f1115] border border-neutral-800">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-xs font-mono">
            <span className="text-neutral-400">PIPELINE KERNEL: </span>
            <span className="text-emerald-400 font-semibold">DETERMINISTIC ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0f1115] border border-neutral-800">
          <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">Total Runs (24h)</div>
          <div className="text-xl font-bold text-white mt-1 font-mono">1,420</div>
          <div className="text-[11px] text-emerald-400 font-mono mt-1">100% Deterministic</div>
        </div>
        <div className="p-4 rounded-xl bg-[#0f1115] border border-neutral-800">
          <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">Success Rate</div>
          <div className="text-xl font-bold text-emerald-400 mt-1 font-mono">99.43%</div>
          <div className="text-[11px] text-neutral-500 font-mono mt-1">8 aborted / schema err</div>
        </div>
        <div className="p-4 rounded-xl bg-[#0f1115] border border-neutral-800">
          <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">Active Parallel Jobs</div>
          <div className="text-xl font-bold text-purple-400 mt-1 font-mono">02</div>
          <div className="text-[11px] text-neutral-400 font-mono mt-1">On GPU-VPS EU-01</div>
        </div>
        <div className="p-4 rounded-xl bg-[#0f1115] border border-neutral-800">
          <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">Elements Computed</div>
          <div className="text-xl font-bold text-white mt-1 font-mono">31.2M</div>
          <div className="text-[11px] text-neutral-500 font-mono mt-1">Across 4 clusters</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-[#0f1115] border border-neutral-800">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {["ALL", "RUNNING", "COMPLETED", "FAILED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                filter === tab
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/50 border border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, pipeline, node..."
            className="w-full bg-[#09090b] border border-neutral-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 font-mono"
          />
        </div>
      </div>

      {/* Main Execution Audit Table */}
      <div className="rounded-xl bg-[#0f1115] border border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0c0d11] text-neutral-400 font-mono border-b border-neutral-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Execution ID</th>
                <th className="py-3.5 px-4 font-semibold">Algorithmic Pipeline</th>
                <th className="py-3.5 px-4 font-semibold">Compute Node</th>
                <th className="py-3.5 px-4 font-semibold">Duration</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">STDOUT Inspection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-mono">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-500 font-mono text-sm">
                    No execution records match current filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const isSelected = selectedRun?.id === item.id;
                  return (
                    <tr 
                      key={item.id}
                      onClick={() => setSelectedRun(isSelected ? null : item)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? "bg-purple-950/20" : "hover:bg-[#14161d]"
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-purple-400">
                        {item.id}
                      </td>
                      <td className="py-3.5 px-4 text-white font-sans font-medium">
                        <div>{item.pipeline}</div>
                        <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                          {item.elementsProcessed.toLocaleString()} primitives • {item.memory}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-neutral-400">
                        {item.node}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-300">
                        {item.duration}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider ${
                          item.status === "COMPLETED"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : item.status === "RUNNING"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/30 animate-pulse"
                            : "bg-red-500/10 text-red-400 border border-red-500/30"
                        }`}>
                          {item.status === "COMPLETED" && <CheckCircle2 className="w-3 h-3" />}
                          {item.status === "RUNNING" && <RefreshCw className="w-3 h-3 animate-spin" />}
                          {item.status === "FAILED" && <AlertTriangle className="w-3 h-3" />}
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button 
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1b1e27] hover:bg-purple-500/20 text-neutral-300 hover:text-purple-300 border border-neutral-700/50 text-[11px] transition-all"
                        >
                          <span>{isSelected ? "Hide Logs" : "View Logs"}</span>
                          <ChevronRight className={`w-3 h-3 transition-transform ${isSelected ? "rotate-90" : ""}`} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Execution STDOUT Log Drawer (Read-Only Terminal) */}
      {selectedRun && (
        <div className="rounded-xl bg-[#0a0b0e] border border-purple-500/30 p-5 space-y-3 font-mono shadow-2xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs font-bold text-white">LOG_STREAM: {selectedRun.id}</span>
              <span className="text-[11px] text-neutral-400">({selectedRun.pipeline})</span>
            </div>
            <div className="text-[11px] text-neutral-500">
              Allocated: {selectedRun.node} • Started: {selectedRun.timestamp}
            </div>
          </div>

          <div className="bg-[#050608] rounded-lg p-4 text-xs space-y-1.5 font-mono text-neutral-300 border border-neutral-900 overflow-x-auto max-h-60">
            {selectedRun.logs.map((line, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-neutral-600 select-none text-[10px] w-5 text-right">{idx + 1}</span>
                <span className={line.includes("ERR") || line.includes("HALT") ? "text-red-400" : line.includes("STATUS_OK") ? "text-emerald-400" : "text-neutral-300"}>
                  {line}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
            <span>Deterministic trace SHA: 8f4b29a...d83c</span>
            <span className="text-neutral-400">Output binary stored in air-gapped IPC volume (Read-Only)</span>
          </div>
        </div>
      )}

      {/* Architectural Notice: Strict Read-Only Policy */}
      <div className="p-4 rounded-xl bg-[#0c0d11] border border-neutral-800/80 text-xs text-neutral-400 flex items-start gap-3">
        <div className="p-1.5 rounded bg-neutral-800 text-neutral-400 shrink-0 mt-0.5">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <span className="text-white font-semibold font-mono">AUTOMATED PIPELINE INGESTION NOTICE:</span>{" "}
          Execution tasks are triggered strictly via authenticated headless webhook or local on-premise daemon. Manual file drag-and-drop or web uploads are strictly disabled to protect enterprise air-gap boundary policies.
        </div>
      </div>

    </div>
  );
}
