// src/app/questionnaires/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getQuestionnaires } from "@/lib/api";
import { Questionnaire } from "@/types/gymmaster";

export default function Questionnaires() {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      const data = await getQuestionnaires();
      setQuestionnaires(data);
    };
    fetchQuestionnaires();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Questionnaires</h1>
      <div className="grid gap-6">
        {questionnaires.map((questionnaire) => (
          <motion.div
            key={questionnaire.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{questionnaire.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold">Questions</h4>
                <ul className="list-disc pl-5">
                  {questionnaire.questions.map((question) => (
                    <li key={question.id}>
                      {question.label} ({question.type})
                      {question.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
