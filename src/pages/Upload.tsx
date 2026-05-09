import { useEffect, useState } from 'react';
import { FileDropzone } from '../components/upload/FileDropzone';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { HelpCircle, Database, FileText, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { resumeService } from '../services/resumeService';
import { Resume } from '../types';

export default function UploadPage() {
  const [storedResumes, setStoredResumes] = useState<Resume[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchResumes = async () => {
    try {
      const resumes = await resumeService.getAll();
      setStoredResumes(resumes);
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    try {
      await resumeService.delete(id);
      setStoredResumes(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error("Failed to delete resume:", error);
      alert("Failed to delete resume");
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete ALL stored resumes? This cannot be undone.")) return;
    setIsDeleting(true);
    try {
      await Promise.all(storedResumes.map(r => resumeService.delete(r.id)));
      setStoredResumes([]);
    } catch (error) {
      console.error("Failed to delete all resumes:", error);
      alert("Failed to delete some or all resumes");
      fetchResumes();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload Resumes</h1>
        <p className="text-muted-foreground">AI will automatically parse skills, experience, and contact info from your PDF files.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <FileDropzone />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg flex items-center">
                <Database className="h-4 w-4 mr-2 text-primary" />
                Stored Resumes ({storedResumes.length})
              </CardTitle>
              {storedResumes.length > 0 && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleDeleteAll}
                  disabled={isDeleting}
                  className="h-7 px-2 text-xs"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete All
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {storedResumes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No resumes stored yet.</p>
                ) : (
                  storedResumes.map((resume) => (
                    <div key={resume.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md border text-sm group">
                      <div className="flex flex-col gap-1 min-w-0 flex-1 pr-2">
                        <div className="font-medium flex items-center gap-2">
                          <FileText className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                          <span className="truncate">{resume.candidate_name || "Unknown Candidate"}</span>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          ID: {resume.id}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDelete(resume.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                        title="Delete resume"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <HelpCircle className="h-4 w-4 mr-2 text-primary" />
                Helpful Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>• Only PDF format is currently supported for best parsing accuracy.</p>
              <p>• Make sure the text is selectable in the PDF (not a flat image).</p>
              <p>• You can upload multiple files at once.</p>
              <p>• AI extraction takes roughly 2-5 seconds per resume.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
