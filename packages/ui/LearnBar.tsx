import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const langs = ["Lushootseed", "Chinuk Wawa", "Inuktitut", "Tlingit"];
const flags: Record<string, string> = {
  Lushootseed: "/media/lushootseed_flag.png",
  "Chinuk Wawa": "/media/chinook_flag.png",
  Inuktitut: "/media/inuktitut_flag.png",
  Tlingit: "/media/tlingit_flag.png"
};

export function LearnBar() {
  const [i, setI] = useState(0);
  
  useEffect(() => {
    const iv = setInterval(() => setI(j => (j + 1) % langs.length), 2000);
    return () => clearInterval(iv);
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Learn:</Text>
      <Image source={{ uri: flags[langs[i]] }} style={styles.flag} />
      <Text style={styles.text}>{langs[i]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 8,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 999,
    backdropFilter: 'blur(6px)',
    border: '2px solid rgba(255,255,255,0.35)',
    color: '#fff'
  },
  label: { 
    fontWeight: "600",
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginRight: 8,
    opacity: 0.9
  },
  flag: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    marginRight: 10,
    verticalAlign: 'middle',
    objectFit: 'cover',
    boxShadow: '0 1px 4px #0002'
  },
  text: { 
    fontWeight: "700",
    color: '#fff',
    minWidth: 160,
    display: 'inline-block',
    position: 'relative',
    animation: 'fadeInUp .4s ease'
  }
});
