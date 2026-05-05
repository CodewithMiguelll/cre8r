import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase";
import { NicheCategory, Niche } from "@/lib/types";

export function useNicheCategories(niche: Niche) {
  return useQuery({
    queryKey: ["niche_categories", niche],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("niche_categories")
        .select("*")
        .eq("niche", niche)
        .order("name", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
}
