import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    flex: 1,
    minWidth: 220,
    background: '#fff',
    borderWidth: 4,
    borderColor: '#8b4513',
    borderRadius: 14,
    padding: 18,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 12px 35px -8px rgba(0,0,0,.15)',
    overflow: 'hidden'
  },
  icon: { 
    fontSize: 28, 
    marginBottom: 8 
  },
  title: { 
    fontWeight: "700", 
    fontSize: 16, 
    marginBottom: 4,
    margin: '6px 0 4px'
  },
  desc: { 
    fontSize: 13, 
    textAlign: "center",
    margin: 0,
    flexGrow: 1
  }
});
