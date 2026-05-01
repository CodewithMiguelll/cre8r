import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { NicheCategory, Niche } from "@/lib/types";

export function useNicheCategories(niche: Niche) {
  const [categories, setCategories] = useState<NicheCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const supabase = createClient();

        const { data, error: fetchError } = await supabase
          .from("niche_categories")
          .select("*")
          .eq("niche", niche)
          .order("name", { ascending: true });

        if (fetchError) throw fetchError;
        setCategories(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch categories",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [niche]);

  return { categories, loading, error };
}
