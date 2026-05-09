import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { resumeService } from '../../services/resumeService';

export function FileDropzone() {
  const [files, setFiles] = useState<Array<{ file: File, status: 'pending' | 'uploading' | 'success' | 'error', errorMessage?: string }>>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles.map(file => ({ file, status: 'pending' as const }))]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: true
  });

  const uploadFiles = async () => {
    for (const [index, item] of files.entries()) {
      if (item.status === 'success') continue;

      setFiles(prev => prev.map((f, i) => i === index ? { ...f, status: 'uploading' } : f));

      try {
        const response: any = await resumeService.upload(item.file);

        if (response.candidate_name === "Already exists" || response.message === "Resume already exists") {
          window.alert(`The resume "${item.file.name}" already exists!`);
          setFiles(prev => prev.map((f, i) => i === index ? { ...f, status: 'error', errorMessage: 'Already exists' } : f));
        } else {
          setFiles(prev => prev.map((f, i) => i === index ? { ...f, status: 'success' } : f));
        }
      } catch (error) {
        setFiles(prev => prev.map((f, i) => i === index ? { ...f, status: 'error' } : f));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center transition-colors cursor-pointer
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50'}`}
      >
        <input {...getInputProps()} />
        <div className="bg-primary/10 p-4 rounded-full mb-4">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <p className="text-lg font-semibold">Drag & drop resumes here</p>
        <p className="text-sm text-muted-foreground mt-1">Only PDF files are supported</p>
        <Button variant="outline" className="mt-6">Select Files</Button>
      </div>

      {files.length > 0 && (
        <div className="bg-card border rounded-xl overflow-hidden">
          <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
            <h4 className="font-medium">Upload Queue ({files.length})</h4>
            <Button size="sm" onClick={uploadFiles} disabled={files.every(f => f.status === 'success')}>
              Start Upload
            </Button>
          </div>
          <div className="divide-y max-h-[300px] overflow-y-auto">
            {files.map((item, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <File className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">{item.file.name}</p>
                    <p className="text-xs text-muted-foreground">{(item.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {item.status === 'uploading' && <span className="text-xs text-primary animate-pulse">Uploading...</span>}
                  {item.status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {item.status === 'error' && (
                    <div className="flex items-center space-x-2 text-destructive">
                      {item.errorMessage && <span className="text-xs font-medium">{item.errorMessage}</span>}
                      <AlertCircle className="h-5 w-5" />
                    </div>
                  )}
                  <button
                    onClick={() => setFiles(f => f.filter((_, i) => i !== index))}
                    className="p-1 hover:bg-muted rounded"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
