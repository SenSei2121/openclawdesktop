/**
 * Legacy compatibility shim — re-exports the flat `api` object
 * that existing components expect.
 *
 * New code should import from '@/api' directly:
 *   import { service, ai, mcp } from '../api';
 */
import * as bridge from '../api/bridge';
import * as svc    from '../api/service';
import * as sys    from '../api/system';
import * as aiApi  from '../api/ai';
import * as ch     from '../api/channels';
import * as mcpApi from '../api/mcp';
import * as sk     from '../api/skills';
import * as diag   from '../api/diagnostics';
import * as cfg    from '../api/config';

export { isDesktop as isTauri } from '../api/bridge';
export const isTauriEnv = bridge.isDesktop;

// Re-export all types so existing `import { ServiceStatus } from '../lib/tauri'` keeps working
export type {
  ServiceStatus, SystemInfo, OfficialProvider, SuggestedModel,
  ConfiguredProvider, ConfiguredModel, AIConfigOverview, ModelConfig,
  AIProviderOption, AIModelOption, ChannelConfig, MCPConfig, Skill,
  DiagnosticResult, AITestResult, PdfConfig, MemoryConfig,
} from '../types';

/** Flat API object — preserved for backward compatibility with existing components. */
export const api = {
  // Service
  getServiceStatus: svc.status,
  startService:     svc.start,
  stopService:      svc.stop,
  restartService:   svc.restart,
  getLogs:          svc.logs,

  // System
  getSystemInfo:        sys.info,
  checkOpenclawInstalled: sys.isInstalled,
  getOpenclawVersion:   sys.version,
  checkOllamaInstalled: sys.isOllamaInstalled,
  getOllamaModels:      sys.ollamaModels,
  installOllamaModel:   sys.installOllamaModel,

  // Config
  getConfig:             cfg.load,
  saveConfig:            cfg.save,
  getEnvValue:           cfg.getEnv,
  saveEnvValue:          cfg.setEnv,
  getToolsProfile:       cfg.toolsProfile,
  saveToolsProfile:      cfg.saveToolsProfile,
  getPdfConfig:          cfg.pdfConfig,
  savePdfConfig:         cfg.savePdfConfig,
  getMemoryConfig:       cfg.memoryConfig,
  saveMemoryConfig:      cfg.saveMemoryConfig,
  validateOpenclawConfig: cfg.validate,

  // AI
  getAIProviders:     aiApi.legacyProviders,
  getOfficialProviders: aiApi.officialProviders,
  getAIConfig:        aiApi.overview,
  saveProvider:       aiApi.saveProvider,
  deleteProvider:     aiApi.deleteProvider,
  setPrimaryModel:    aiApi.setPrimaryModel,
  addAvailableModel:  aiApi.addModel,
  removeAvailableModel: aiApi.removeModel,

  // Channels
  getChannelsConfig:  ch.list,
  saveChannelConfig:  ch.save,

  // MCP
  getMCPConfig:       mcpApi.list,
  saveMCPConfig:      mcpApi.save,
  installMCPFromGit:  mcpApi.installFromGit,
  uninstallMCP:       mcpApi.uninstall,
  checkMcporterInstalled: mcpApi.isMcporterInstalled,
  installMcporter:    mcpApi.installMcporter,
  uninstallMcporter:  mcpApi.uninstallMcporter,
  installMCPPlugin:   mcpApi.installPlugin,
  openclawConfigSet:  mcpApi.configSet,
  testMCPServer:      mcpApi.test,

  // Skills
  getSkills:      sk.list,
  installSkill:   sk.install,
  uninstallSkill: sk.uninstall,

  // Diagnostics
  runDoctor:        diag.doctor,
  testAIConnection: diag.testAI,
  testChannel:      diag.testChannel,
};
