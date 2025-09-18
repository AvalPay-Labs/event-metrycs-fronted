"use client";

import React, { useState } from "react";
import { FileSpreadsheet, Upload, X, Check, AlertCircle, Download, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/lib/hooks/use-toast";
import * as XLSX from 'xlsx';

interface ImportDataFormProps {
  eventId: string;
  onImport: (eventId: string, file: File, type: 'attendees' | 'metrics') => Promise<void>;
  isLoading?: boolean;
}

export function ImportDataForm({
  eventId,
  onImport,
  isLoading = false,
}: ImportDataFormProps) {
  const toast = useToast(); // Usar el hook correctamente
  const [dragActive, setDragActive] = useState(false);
  const [importType, setImportType] = useState<'attendees' | 'metrics'>('attendees');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');

  const validateFile = (file: File): string => {
    if (!file) {
      return 'Debes seleccionar un archivo';
    }

    const validTypes = [
      'text/csv',
      'application/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    const fileName = file.name.toLowerCase();
    const isValidExtension = fileName.endsWith('.csv') || fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
    const isValidType = validTypes.includes(file.type) || isValidExtension;

    if (!isValidType) {
      return 'Formato de archivo no válido. Usa CSV o Excel (.xlsx, .xls)';
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      return 'El archivo es muy grande. Máximo 10MB';
    }

    return '';
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('onSubmit called with:', { 
      selectedFile: selectedFile ? { name: selectedFile.name, size: selectedFile.size, type: selectedFile.type } : null, 
      importType,
      eventId
    });
    
    if (!selectedFile) {
      setFileError('Debes seleccionar un archivo');
      return;
    }

    const fileValidationError = validateFile(selectedFile);
    if (fileValidationError) {
      setFileError(fileValidationError);
      return;
    }

    try {
      console.log('About to call onImport with:', { 
        eventId, 
        fileName: selectedFile.name, 
        fileSize: selectedFile.size,
        fileType: selectedFile.type,
        importType 
      });
      
      // Llamar directamente con los parámetros correctos
      await onImport(eventId, selectedFile, importType);
      
      // Limpiar después del éxito
      setSelectedFile(null);
      setFileError('');
      
      // Limpiar el input también
      const fileInput = document.getElementById("file-upload") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      
      toast.success("Datos importados correctamente");
    } catch (error: unknown) {
      console.error('Error in onSubmit:', error);
      toast.error((error as Error).message || "Error importing data");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      console.log('File dropped:', { name: file.name, size: file.size, type: file.type });
      
      const error = validateFile(file);
      if (error) {
        setFileError(error);
        return;
      }
      
      setSelectedFile(file);
      setFileError('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log('File selected:', { name: file.name, size: file.size, type: file.type });
      
      const error = validateFile(file);
      if (error) {
        setFileError(error);
        return;
      }
      
      setSelectedFile(file);
      setFileError('');
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setFileError('');
    
    // Limpiar el input también
    const fileInput = document.getElementById("file-upload") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const downloadAttendeesTemplate = () => {
    try {
      const data = [
        ['name', 'email', 'walletAddress'],
        ['Juan Pérez', 'juan.perez@email.com', '0x1234567890abcdef1234567890abcdef12345678'],
        ['María García', 'maria.garcia@email.com', '0xabcdef1234567890abcdef1234567890abcdef12'],
        ['Carlos López', 'carlos.lopez@email.com', ''],
        ['Ana Martínez', 'ana.martinez@email.com', '0x9876543210fedcba9876543210fedcba98765432'],
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];

      downloadExcel(data, 'attendees-template', 'Asistentes');
      toast.success("Template de asistentes descargado");
    } catch {
      toast.error("Error al descargar el template");
    }
  };

  const downloadMetricsTemplate = () => {
    try {
      const data = [
        [
          'confirmedAttendees',
          'totalAttendees', 
          'attendeesWithCertificate',
          'previosEventAttendees',
          'newWallets',
          'transactionsAfterEvent',
          'totalCost',
          'budgetSurplusDeficit',
          'virtualEngagement',
          'virtualConnectionTime',
          'marketingChannels',
          'marketingCampaign',
          'specialGuests',
          'openedWalletAddresses'
        ],
        [
          'Asistentes confirmados',
          'Total de asistentes',
          'Asistentes con certificado',
          'Asistentes de eventos previos',
          'Wallets nuevas creadas',
          'Transacciones después del evento',
          'Costo total del evento',
          'Superávit/Déficit presupuestario',
          'Engagement virtual (%)',
          'Tiempo de conexión virtual (min)',
          'Canales de marketing (separar con ;)',
          'Nombre de la campaña',
          'Invitados especiales (separar con ;)',
          'Direcciones de wallets (separar con ;)'
        ],
        [
          150,
          180,
          120,
          50,
          75,
          45,
          5000,
          500,
          85,
          120,
          'Social Media;Email;Website',
          'Campaña Q1 2024',
          'Vitalik Buterin;Satoshi Nakamoto',
          '0xabcd1234;0xefgh5678'
        ]
      ];

      downloadExcel(data, 'event-metrics-template', 'Métricas del Evento');
      toast.success("Template de métricas descargado");
    } catch {
      toast.error("Error al descargar el template");
    }
  };

  const downloadExcel = (data: unknown[][], filename: string, sheetName: string) => {
    try {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(data);
      
      const colWidths = data[0].map((_, colIndex) => {
        const maxLength = Math.max(
          ...data.map(row => 
            row[colIndex] ? row[colIndex].toString().length : 0
          )
        );
        return { wch: Math.min(Math.max(maxLength + 2, 10), 50) };
      });
      ws['!cols'] = colWidths;
      
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
      
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.xlsx`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error: unknown) {
      console.error('Error generating Excel file:', error);
      throw error;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Importar datos del evento</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={importType} onValueChange={(value) => setImportType(value as 'attendees' | 'metrics')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="attendees" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Asistentes
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Métricas del Evento
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="attendees" className="space-y-4">
            <div className="bg-element p-4 rounded-lg">
              <h3 className="font-medium text-text mb-2">Importar Lista de Asistentes</h3>
              <p className="text-sm text-textSecondary mb-3">
                <strong>✅ CSV de lu.ma completamente soportado</strong> - Solo necesitas subir el archivo tal como lo descargas.
                <br />
                Automáticamente extraemos nombre y email de cada asistente.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={downloadAttendeesTemplate}
                className="mt-3"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar Template Excel (opcional)
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-4">
            <div className="bg-element p-4 rounded-lg">
              <h3 className="font-medium text-text mb-2">Importar Métricas del Evento</h3>
              <p className="text-sm text-textSecondary mb-3">
                Importa métricas generales del evento. Solo se necesita una fila con los valores totales del evento.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={downloadMetricsTemplate}
                className="mt-3"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar Template Excel
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <form onSubmit={onSubmit} className="space-y-4 mt-6">
          <div 
            className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
              dragActive ? "border-primary bg-primary/10" : "border-element"
            } ${fileError ? "border-error" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="flex items-center justify-between bg-element p-3 rounded-lg">
                <div className="flex items-center">
                  <FileSpreadsheet className="w-8 h-8 text-primary mr-3" />
                  <div>
                    <div className="font-medium text-text">{selectedFile.name}</div>
                    <div className="text-sm text-textSecondary">
                      {(selectedFile.size / 1024).toFixed(2)} KB • {selectedFile.type || 'unknown type'}
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      ✅ Archivo válido - Listo para importar
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={clearFile}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-12 h-12 text-textSecondary mx-auto mb-3" />
                <p className="text-text mb-2">
                  Arrastra y suelta tu archivo CSV o Excel aquí
                </p>
                <p className="text-sm text-textSecondary mb-4">
                  {importType === 'attendees' 
                    ? '📋 Sube tu CSV de lu.ma directamente' 
                    : '📊 Archivo de métricas del evento'
                  }
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  Seleccionar archivo
                </Button>
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              accept=".csv, .xlsx, .xls, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          
          {fileError && (
            <div className="flex items-center text-error text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>{fileError}</span>
            </div>
          )}
          
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!selectedFile || isLoading || !!fileError}
              className="min-w-[140px]"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Importando...
                </div>
              ) : (
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  Importar {importType === 'attendees' ? 'Asistentes' : 'Métricas'}
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}